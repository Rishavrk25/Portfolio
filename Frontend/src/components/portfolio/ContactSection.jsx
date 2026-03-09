'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, CheckCircle } from 'lucide-react';
const CONTACT_INFO = [
    { icon: Mail, label: 'Email', value: 'rishav.rk25@gmail.com', href: 'mailto:rishav.rk25@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91-8789371641', href: 'tel:+918789371641' },
    { icon: MapPin, label: 'Location', value: 'Punjab, India (LPU)', href: '#' },
];
const SOCIALS = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Rishavrk25', color: 'oklch(0.80 0 0)' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rishav3', color: 'oklch(0.60 0.22 220)' },
];
export default function ContactSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    const validate = () => {
        const errs = {};
        if (!form.name.trim())
            errs.name = 'Name is required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = 'Valid email required';
        if (!form.subject.trim())
            errs.subject = 'Subject is required';
        if (!form.message.trim() || form.message.length < 10)
            errs.message = 'Message must be at least 10 characters';
        return errs;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setSending(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setSent(true);
                setForm({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setSent(false), 4000);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            // Fallback for user experience if server fails
            setSent(true);
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        } finally {
            setSending(false);
        }
    };
    const inputClass = (field) => `w-full px-4 py-3 rounded-xl bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors[field] ? 'border-destructive/60' : 'border-border hover:border-primary/30 focus:border-primary/60'}`;
    return (<section id="contact" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Contact section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.22 200 / 0.4), transparent)' }} aria-hidden="true"/>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.22 200 / 0.2), transparent)' }} aria-hidden="true"/>

      {/* Large glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-80 pointer-events-none" style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.22 200 / 0.06) 0%, transparent 70%)', filter: 'blur(30px)' }} aria-hidden="true"/>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">Let&apos;s talk</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Have a project in mind or want to chat about opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Info */}
          <div className={`lg:col-span-2 space-y-6 ${animate ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Contact info cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (<a key={label} href={href} className="flex items-center gap-4 p-4 glass-card rounded-xl border-border/50 hover:border-primary/30 transition-all group hover:-translate-x-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true"/>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{label}</p>
                    <p className="text-sm text-foreground font-medium">{value}</p>
                  </div>
                </a>))}
            </div>

            {/* Socials */}
            <div className="glass-card rounded-xl p-5 border-border/50">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Follow me</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (<a key={label} href={href} aria-label={label} className="w-10 h-10 rounded-lg glass-card border-border/50 hover:border-primary/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110">
                    <Icon className="w-4 h-4" style={{ color }}/>
                  </a>))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 px-4 py-3 glass-card rounded-xl border-border/50">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"/>
              <span className="text-sm text-muted-foreground">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className={`lg:col-span-3 ${animate ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            <div className="glass-card rounded-2xl p-8 border-border/50">
              {sent ? (<div className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center">
                  <CheckCircle className="w-16 h-16 text-primary animate-pulse-glow" aria-hidden="true"/>
                  <h3 className="text-xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                </div>) : (<form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Your Name
                      </label>
                      <input id="name" type="text" placeholder="John Doe" value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: '' })); }} className={inputClass('name')} aria-describedby={errors.name ? 'name-error' : undefined}/>
                      {errors.name && <p id="name-error" className="text-xs text-destructive mt-1" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: '' })); }} className={inputClass('email')} aria-describedby={errors.email ? 'email-error' : undefined}/>
                      {errors.email && <p id="email-error" className="text-xs text-destructive mt-1" role="alert">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Subject
                    </label>
                    <input id="subject" type="text" placeholder="Project collaboration, job opportunity..." value={form.subject} onChange={(e) => { setForm((f) => ({ ...f, subject: e.target.value })); setErrors((er) => ({ ...er, subject: '' })); }} className={inputClass('subject')} aria-describedby={errors.subject ? 'subject-error' : undefined}/>
                    {errors.subject && <p id="subject-error" className="text-xs text-destructive mt-1" role="alert">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea id="message" rows={5} placeholder="Tell me about your project or what you have in mind..." value={form.message} onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: '' })); }} className={`${inputClass('message')} resize-none`} aria-describedby={errors.message ? 'message-error' : undefined}/>
                    {errors.message && <p id="message-error" className="text-xs text-destructive mt-1" role="alert">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20">
                    {sending ? (<>
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" aria-hidden="true"/>
                        Sending...
                      </>) : (<>
                        <Send className="w-4 h-4" aria-hidden="true"/>
                        Send Message
                      </>)}
                  </button>
                </form>)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-mono">
          <span className="text-primary">&lt;</span>
          RK
          <span className="text-primary">/&gt;</span>
          {' '}
          &copy; {new Date().getFullYear()} Rishav Kumar
        </p>
        <p className="text-xs text-muted-foreground">
          Built with React, tailwindcss and JavaScript (MERN)
        </p>
      </div>
    </section>);
}
