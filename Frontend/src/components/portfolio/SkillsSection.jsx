'use client';
import { useEffect, useRef, useState } from 'react';
const SKILL_CATEGORIES = [
    {
        title: 'Languages',
        color: 'oklch(0.72 0.22 200)',
        skills: [
            { name: 'JavaScript', level: 90 },
            { name: 'Java', level: 75 },
            { name: 'C++', level: 72 },
            { name: 'C', level: 70 },
            { name: 'SQL', level: 78 },
        ],
    },
    {
        title: 'Frontend',
        color: 'oklch(0.65 0.22 145)',
        skills: [
            { name: 'React.js', level: 88 },
            { name: 'HTML & CSS', level: 92 },
            { name: 'Tailwind CSS', level: 85 },
            { name: 'PHP', level: 65 },
        ],
    },
    {
        title: 'Backend & Database',
        color: 'oklch(0.65 0.18 160)',
        skills: [
            { name: 'Node.js', level: 85 },
            { name: 'Express.js', level: 82 },
            { name: 'MongoDB', level: 82 },
            { name: 'MySQL', level: 78 },
        ],
    },
    {
        title: 'Tools & Platforms',
        color: 'oklch(0.68 0.20 270)',
        skills: [
            { name: 'Git & GitHub', level: 88 },
            { name: 'VS Code', level: 95 },
            { name: 'REST APIs', level: 85 },
            { name: 'Razorpay API', level: 72 },
            { name: 'Gemini API', level: 70 },
        ],
    },
];
const TECH_ICONS = [
    'React.js', 'Node.js', 'MongoDB', 'Express.js', 'JavaScript',
    'Java', 'C++', 'SQL', 'MySQL', 'Tailwind CSS',
    'HTML', 'CSS', 'PHP', 'Git', 'GitHub',
    'LeetCode', 'GFG', 'DSA', 'VS Code',
];
function SkillBar({ name, level, color, animate }) {
    return (<div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{
            width: animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: animate ? `0 0 8px ${color}60` : 'none',
        }}/>
      </div>
    </div>);
}
export default function SkillsSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.2 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (<section id="skills" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Skills section">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.72 0.22 200 / 0.4), transparent)' }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">What I know</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Languages, frameworks and tools I use to build end-to-end web applications — from interactive UIs to RESTful APIs and optimized databases.
          </p>
        </div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, catIdx) => (<div key={cat.title} className={`glass-card rounded-2xl p-6 border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${animate ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${catIdx * 120}ms` }}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color}80` }} aria-hidden="true"/>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill) => (<SkillBar key={skill.name} {...skill} color={cat.color} animate={animate}/>))}
              </div>
            </div>))}
        </div>

        {/* Tech badge cloud */}
        <div className="text-center">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">Also worked with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_ICONS.map((tech, i) => (<span key={tech} className={`px-4 py-2 rounded-full glass-card text-sm font-mono text-muted-foreground border-border/40 hover:text-primary hover:border-primary/40 transition-all cursor-default hover:scale-105 ${animate ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: `${500 + i * 50}ms` }}>
                {tech}
              </span>))}
          </div>
        </div>
      </div>
    </section>);
}
