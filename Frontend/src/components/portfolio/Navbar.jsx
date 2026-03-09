'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
];
export default function Navbar({ activeSection, onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const handleNav = (id) => {
        onNavigate(id);
        setMobileOpen(false);
    };
    return (<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-background/20'
            : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16" aria-label="Main navigation">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 group" aria-label="Go to home">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors"/>
            <Code2 className="w-4 h-4 text-primary relative z-10"/>
          </div>
          <span className="font-mono text-sm font-bold text-foreground">
            <span className="text-primary">&lt;</span>
            RK
            <span className="text-primary">/&gt;</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map((item) => (<li key={item.id}>
              <button onClick={() => handleNav(item.id)} className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md group ${activeSection === item.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'}`} aria-current={activeSection === item.id ? 'page' : undefined}>
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${activeSection === item.id
                ? 'w-4/5 bg-primary shadow-[0_0_8px_rgba(100,220,210,0.8)]'
                : 'w-0 bg-primary group-hover:w-1/2'}`}/>
              </button>
            </li>))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button onClick={() => handleNav('contact')} className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-200 glow-border">
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle mobile menu">
          {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 bg-background/95 backdrop-blur-xl border-b border-border/60">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item) => (<li key={item.id}>
                <button onClick={() => handleNav(item.id)} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeSection === item.id
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                  {item.label}
                </button>
              </li>))}
          </ul>
        </div>
      </div>
    </header>);
}
