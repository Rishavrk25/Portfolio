'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Download, Sparkles } from 'lucide-react';
const TYPED_STRINGS = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'React.js Developer',
    'Node.js Developer',
    'DSA Problem Solver',
];
const STATS = [
    { value: '500+', label: 'DSA Problems Solved' },
    { value: '1500+', label: 'LeetCode Rating' },
    { value: '3', label: 'Projects Built' },
    { value: '8.9', label: 'CGPA at LPU' },
];
export default function HeroSection({ onNavigate }) {
    const [typedText, setTypedText] = useState('');
    const [stringIndex, setStringIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [visible, setVisible] = useState(false);
    const avatarRef = useRef(null);
    // Typed effect
    useEffect(() => {
        setVisible(true);
        const current = TYPED_STRINGS[stringIndex];
        const speed = isDeleting ? 40 : 70;
        const delay = isDeleting && charIndex === 0 ? 500 : speed;
        const timer = setTimeout(() => {
            if (!isDeleting) {
                setTypedText(current.slice(0, charIndex + 1));
                if (charIndex + 1 === current.length) {
                    setTimeout(() => setIsDeleting(true), 1800);
                }
                else {
                    setCharIndex((c) => c + 1);
                }
            }
            else {
                setTypedText(current.slice(0, charIndex - 1));
                if (charIndex === 0) {
                    setIsDeleting(false);
                    setStringIndex((s) => (s + 1) % TYPED_STRINGS.length);
                }
                else {
                    setCharIndex((c) => c - 1);
                }
            }
        }, delay);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, stringIndex]);
    // Mouse parallax on avatar
    useEffect(() => {
        const handleMouse = (e) => {
            if (!avatarRef.current)
                return;
            const rect = avatarRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / 30;
            const dy = (e.clientY - cy) / 30;
            avatarRef.current.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);
    return (<section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden" aria-label="Hero section">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" aria-hidden="true"/>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, oklch(0.72 0.22 200 / 0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
        }} aria-hidden="true"/>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, oklch(0.55 0.25 265 / 0.10) 0%, transparent 70%)',
            filter: 'blur(50px)',
        }} aria-hidden="true"/>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: Text */}
        <div className={`space-y-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 animate-pulse-glow" aria-hidden="true"/>
            Available for hire
          </div>

          {/* Name */}
          <div>
            <p className="font-mono text-muted-foreground text-sm mb-2 tracking-widest uppercase">Hello, I&apos;m</p>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-balance">
              <span className="gradient-text">Rishav</span>
              <br />
              <span className="text-foreground">Kumar</span>
            </h1>
          </div>

          {/* Typed text */}
          <div className="h-10 flex items-center">
            <span className="font-mono text-xl text-primary glow-text">
              {typedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-[blink_0.8s_step-end_infinite]" aria-hidden="true"/>
            </span>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground leading-relaxed max-w-lg text-balance">
            B.Tech CSE student at Lovely Professional University building full-stack web apps with the MERN stack.
            Passionate about clean code, DSA, and shipping real products that solve real problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => onNavigate('projects')} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
              View My Work
            </button>
            <button onClick={() => onNavigate('resume')} className="px-6 py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
              <Download className="w-4 h-4" aria-hidden="true"/>
              Download CV
            </button>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Find me on</span>
            <div className="flex gap-3">
              {[
            { icon: Github, label: 'GitHub', href: 'https://github.com/Rishavrk25' },
            { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/rishav3' },
        ].map(({ icon: Icon, label, href }) => (<a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:scale-110 hover:-translate-y-0.5">
                  <Icon className="w-4 h-4"/>
                </a>))}
            </div>
          </div>
        </div>

        {/* Right: Avatar / Visual */}
        <div className="flex justify-center lg:justify-end" style={{ perspective: '600px' }}>
          <div ref={avatarRef} className="relative w-72 h-72 lg:w-96 lg:h-96 transition-transform duration-100" style={{ transformStyle: 'preserve-3d' }}>
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" style={{
            background: 'conic-gradient(from 0deg, transparent 0%, oklch(0.72 0.22 200 / 0.15) 25%, transparent 50%, oklch(0.55 0.25 265 / 0.12) 75%, transparent 100%)',
        }} aria-hidden="true"/>
            {/* Middle ring */}
            <div className="absolute inset-6 rounded-full border border-border/40" aria-hidden="true"/>
            {/* Avatar container */}
            <div className="absolute inset-10 rounded-full glass-card glow-border overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 30% 30%, oklch(0.72 0.22 200 / 0.15), oklch(0.55 0.25 265 / 0.1) 50%, transparent)',
        }} aria-hidden="true"/>
              <span className="text-6xl lg:text-8xl font-bold gradient-text relative z-10 select-none" aria-label="RK initials">
                RK
              </span>
            </div>

            {/* Floating tech badges */}
            {[
            { label: 'React', angle: -30, dist: 120, color: '#61DAFB' },
            { label: 'Node.js', angle: 60, dist: 115, color: '#68A063' },
            { label: 'MongoDB', angle: 150, dist: 120, color: '#47A248' },
            { label: 'Express', angle: 240, dist: 115, color: '#94a3b8' },
        ].map(({ label, angle, dist, color }) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * dist;
            const y = Math.sin(rad) * dist;
            return (<div key={label} className="absolute glass-card px-3 py-1.5 rounded-full text-xs font-mono font-semibold animate-float border border-border/60" style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    color,
                    animationDelay: `${angle / 60}s`,
                }} aria-hidden="true">
                  {label}
                </div>);
        })}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-16 left-0 right-0 z-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (<div key={stat.label} className="glass-card rounded-xl p-4 text-center border-border/40 hover:border-primary/30 transition-all hover:scale-105" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => onNavigate('skills')} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors group" aria-label="Scroll to skills">
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true"/>
      </button>
    </section>);
}
