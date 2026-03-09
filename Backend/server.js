import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

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

// API Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (process.env.MONGO_URI) {
      const newContact = new Contact({ name, email, subject, message });
      await newContact.save();
    }

    console.log('New contact form submission:', { name, email, subject, message });
    res.status(200).json({ success: true, message: 'Message received successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
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
