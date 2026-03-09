'use client';
import { useEffect, useRef, useState } from 'react';
import { Trophy, Medal, Star, Code, Zap, GraduationCap, ExternalLink } from 'lucide-react';
const ACHIEVEMENTS = [
    {
        icon: Trophy,
        title: 'Solved 500+ DSA Problems',
        org: 'LeetCode & GeeksForGeeks',
        description: 'Consistently solved algorithmic challenges across LeetCode and GFG, covering arrays, trees, graphs, DP, and recursion to sharpen problem-solving skills.',
        color: 'oklch(0.75 0.22 60)',
        badge: 'gold',
        link: '#',
    },
    {
        icon: Star,
        title: '1500+ LeetCode Contest Rating',
        org: 'LeetCode',
        description: 'Achieved a 1500+ contest rating on LeetCode through regular participation in weekly and biweekly contests, demonstrating consistent competitive programming performance.',
        color: 'oklch(0.72 0.22 200)',
        badge: 'cyan',
        link: '#',
    },
    {
        icon: Code,
        title: 'MERN Stack Developer',
        org: 'Full Stack Projects',
        description: 'Built 3 complete full-stack projects including an e-commerce platform with Razorpay integration, an AI meme generator, and a bus management system.',
        color: 'oklch(0.65 0.22 145)',
        badge: 'green',
        link: null,
    },
    {
        icon: Medal,
        title: 'DSA Summer Training',
        org: 'CipherSchools — Jul 2025',
        description: 'Successfully completed comprehensive DSA training covering advanced algorithms, time-space complexity analysis, and structured problem-solving on LeetCode and GFG.',
        color: 'oklch(0.68 0.20 270)',
        badge: 'blue',
        link: '#',
    },
    {
        icon: GraduationCap,
        title: 'B.Tech CSE — CGPA 8.9',
        org: 'Lovely Professional University',
        description: 'Maintaining a strong academic performance of 8.9 CGPA in Computer Science & Engineering while simultaneously building full-stack projects and competitive programming skills.',
        color: 'oklch(0.65 0.18 160)',
        badge: 'purple',
        link: null,
    },
    {
        icon: Zap,
        title: 'Cloud Computing Certified',
        org: 'NPTEL — IIT Faculty',
        description: 'Earned NPTEL Cloud Computing certification from IIT/IISc faculty, covering virtualization, distributed systems, service models and cloud deployment strategies.',
        color: 'oklch(0.72 0.22 30)',
        badge: 'orange',
        link: '#',
    },
];
const COUNTER_STATS = [
    { value: 500, suffix: '+', label: 'DSA Problems Solved' },
    { value: 1500, suffix: '+', label: 'LeetCode Rating' },
    { value: 3, suffix: '', label: 'Projects Built' },
    { value: 8, suffix: '.9', label: 'CGPA at LPU' },
];
function CounterStat({ value, suffix, label, animate }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!animate)
            return;
        let start = 0;
        const step = Math.ceil(value / 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            }
            else
                setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [animate, value]);
    return (<div className="text-center glass-card rounded-xl p-5 border-border/40 hover:border-primary/30 transition-all hover:-translate-y-1">
      <div className="text-3xl font-bold gradient-text font-mono">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>);
}
export default function AchievementsSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (<section id="achievements" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Achievements section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.75 0.22 60 / 0.4), transparent)' }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">Recognition</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Milestones, ratings, and recognitions that reflect my dedication to competitive programming, academics, and real-world development.
          </p>
        </div>

        {/* Counter stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {COUNTER_STATS.map((stat, i) => (<div key={stat.label} style={{ animationDelay: `${i * 100}ms` }}>
              <CounterStat {...stat} animate={animate}/>
            </div>))}
        </div>

        {/* Achievements grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = item.icon;
            return (<div key={item.title} className={`glass-card rounded-2xl p-6 border-border/50 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-1.5 ${animate ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${400 + i * 100}ms` }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}>
                    <Icon className="w-6 h-6" style={{ color: item.color }} aria-hidden="true"/>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: item.color }}>{item.org}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                {item.link && (<a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline" aria-label={`View ${item.title}`}>
                    View <ExternalLink className="w-3 h-3" aria-hidden="true"/>
                  </a>)}
              </div>);
        })}
        </div>
      </div>
    </section>);
}
