'use client';
import { useEffect, useRef, useState } from 'react';
const SKILL_CATEGORIES = [
    {
        title: 'Languages',
        color: 'oklch(0.72 0.22 200)',
        skills: [
            { name: 'JavaScript', level: 90, icon: 'https://cdn.simpleicons.org/javascript' },
            { name: 'Java', level: 75, icon: 'https://cdn.simpleicons.org/openjdk/white' },
            { name: 'C++', level: 72, icon: 'https://cdn.simpleicons.org/cplusplus' },
            { name: 'C', level: 70, icon: 'https://cdn.simpleicons.org/c' },
            { name: 'SQL', level: 78, icon: 'https://cdn.simpleicons.org/mysql/white' },
            { name: 'DSA', level: 85, icon: 'https://cdn.simpleicons.org/codeigniter/white' },
        ],
    },
    {
        title: 'Frontend',
        color: 'oklch(0.65 0.22 145)',
        skills: [
            { name: 'React.js', level: 88, icon: 'https://cdn.simpleicons.org/react' },
            { name: 'HTML & CSS', level: 92, icon: 'https://cdn.simpleicons.org/html5' },
            { name: 'Tailwind CSS', level: 85, icon: 'https://cdn.simpleicons.org/tailwindcss' },
            { name: 'PHP', level: 65, icon: 'https://cdn.simpleicons.org/php' },
        ],
    },
    {
        title: 'Backend & Database',
        color: 'oklch(0.65 0.18 160)',
        skills: [
            { name: 'Node.js', level: 85, icon: 'https://cdn.simpleicons.org/nodedotjs' },
            { name: 'Express.js', level: 82, icon: 'https://cdn.simpleicons.org/express/white' },
            { name: 'MongoDB', level: 82, icon: 'https://cdn.simpleicons.org/mongodb' },
            { name: 'MySQL', level: 78, icon: 'https://cdn.simpleicons.org/mysql' },
        ],
    },
    {
        title: 'Tools & Platforms',
        color: 'oklch(0.68 0.20 270)',
        skills: [
            { name: 'Git & GitHub', level: 88, icon: 'https://cdn.simpleicons.org/github/white' },
            { name: 'VS Code', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
            { name: 'REST APIs', level: 85, icon: 'https://cdn.simpleicons.org/postman' },
            { name: 'Razorpay API', level: 72, icon: 'https://cdn.simpleicons.org/razorpay/3395FF' },
            { name: 'Gemini API', level: 70, icon: 'https://cdn.simpleicons.org/googlegemini' },
            { name: 'LeetCode', level: 80, icon: 'https://cdn.simpleicons.org/leetcode/white' },
            { name: 'GeeksForGeeks', level: 80, icon: 'https://cdn.simpleicons.org/geeksforgeeks/white' },
        ],
    },
];
// Uncategorized cloud removed
function SkillBar({ name, level, color, animate, icon }) {
    return (<div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt={`${name} logo`} className="w-4 h-4 object-contain brightness-90 group-hover:brightness-110 group-hover:scale-110 transition-all" aria-hidden="true" />}
          <span className="text-sm font-medium text-foreground">{name}</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{
            width: animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color.replace(')', ' / 0.8)')})`,
            boxShadow: animate ? `0 0 8px ${color.replace(')', ' / 0.4)')}` : 'none',
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
                <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ background: cat.color, boxShadow: `0 0 10px ${cat.color.replace(')', ' / 0.5)')}` }} aria-hidden="true"/>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill) => (<SkillBar key={skill.name} {...skill} color={cat.color} animate={animate}/>))}
              </div>
            </div>))}
        </div>

      </div>
    </section>);
}
