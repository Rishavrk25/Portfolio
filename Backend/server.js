import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// MongoDB connection (optional, will connect if MONGO_URI is provided)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGO_URI provided, skipping MongoDB connection. Form submissions will only be logged.');
}

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration on startup
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter.verify((error) => {
    if (error) {
      console.error('Nodemailer configuration error:', error);
    } else {
      console.log('Nodemailer is ready to send messages');
    }
  });
} else {
  console.log('EMAIL_USER or EMAIL_PASS not provided. Form submissions will not trigger emails.');
}

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (process.env.MONGO_URI) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
    }

    // Try sending emails if EMAIL_USER is configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // 1. Admin Notification (Send to yourself)
      const adminMailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Sending through authenticated user
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `[Portfolio Contact] ${subject || 'New Message'}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #61DAFB;">New Portfolio Message</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
            <hr style="border: 1px solid #eee; margin: 15px 0;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `
      };

      // 2. User Auto-Reply
      const userMailOptions = {
        from: `"Rishav Kumar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for reaching out!`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <p>Hi ${name},</p>
            <p>Thank you for getting in touch through my portfolio. I've received your message regarding <strong>"${subject || 'your inquiry'}"</strong>.</p>
            <p>I usually respond within 24-48 hours. Looking forward to connecting with you!</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Rishav Kumar</strong><br>
            <a href="https://linkedin.com/in/rishav3" style="color: #61DAFB;">LinkedIn</a> | <a href="https://github.com/Rishavrk25" style="color: #61DAFB;">GitHub</a></p>
          </div>
        `
      };

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);
      console.log(`Emails successfully sent for: ${name}`);
    }

    console.log('New contact form submission processed:', { name, email });
    res.status(200).json({ success: true, message: 'Message received and emails sent successfully' });
  } catch (error) {
    console.error('Error saving contact or sending emails:', error);
    res.status(500).json({ success: false, message: 'Server Error processing your request' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Frontend/dist/index.html'));
  });
}

// AI Chatbot Route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // System instruction for the assistant
    const systemInstruction = `
You are Rishav Kumar's AI assistant for his developer portfolio. 
You are helpful, concise, and professional. 
Rishav is a B.Tech CSE student at Lovely Professional University.
He focuses on the MERN stack (MongoDB, Express, React, Node.js) and DSA problem solving in Java/C++.
Respond strictly in plain text or markdown to formatting queries about Rishav's background. Do not break character.
    `;

    // Map conversation history safely
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user', // genai expects "model" or "user"
      parts: [{ text: msg.content }]
    }));

    // Create the chat session
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
