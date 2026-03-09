'use client';
import { useEffect, useRef, useState } from 'react';
import { Download, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
const EXPERIENCE = [
    {
        title: 'MERN Full Stack Development Training',
        company: 'Gokboru Tech',
        period: "Jun '25 – Jul '25",
        type: 'Summer Training',
        points: [
            'Completed 6-week intensive training covering the full MERN stack (MongoDB, Express.js, React, Node.js).',
            'Built production-grade projects including an e-commerce platform with Razorpay payment gateway integration.',
            'Developed RESTful APIs, implemented JWT authentication, and managed MongoDB databases end-to-end.',
        ],
        color: 'oklch(0.72 0.22 200)',
    },
    {
        title: 'Data Structures & Algorithms Training',
        company: 'CipherSchools',
        period: "Jul '25",
        type: 'Summer Training',
        points: [
            'Completed comprehensive DSA training covering arrays, linked lists, trees, graphs, recursion, and dynamic programming.',
            'Strengthened coding proficiency through structured problem-solving on LeetCode and GFG — 500+ problems solved.',
            'Gained hands-on experience implementing advanced algorithms and analyzing space-time complexity trade-offs.',
        ],
        color: 'oklch(0.68 0.20 270)',
    },
    {
        title: 'E-Commerce Platform — International Client',
        company: 'Freelance / Project',
        period: "Nov '25",
        type: 'Project',
        points: [
            'Developed a complete e-commerce website with product catalog management for an international client.',
            'Integrated Razorpay payment gateway and built secure user authentication (login/signup).',
            'Optimized MongoDB queries for faster product retrieval and built efficient RESTful APIs.',
        ],
        color: 'oklch(0.65 0.22 145)',
    },
];
const EDUCATION = [
    {
        degree: 'B.Tech — Computer Science & Engineering',
        institution: 'Lovely Professional University, Punjab',
        period: "Aug '23 – Present",
        grade: 'CGPA: 8.9',
        color: 'oklch(0.72 0.22 200)',
    },
    {
        degree: 'Intermediate (Class XII)',
        institution: 'Jesus And Mary Academy, Darbhanga, Bihar',
        period: "Apr '19 – Mar '21",
        grade: 'Percentage: 82.6%',
        color: 'oklch(0.68 0.20 270)',
    },
    {
        degree: 'Matriculation (Class X)',
        institution: 'Jesus And Mary Academy, Darbhanga, Bihar',
        period: "Apr '18 – Mar '19",
        grade: 'Percentage: 92.2%',
        color: 'oklch(0.65 0.22 145)',
    },
];
export default function ResumeSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    const [activeTab, setActiveTab] = useState('training');
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (<section id="resume" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Resume section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.68 0.20 270 / 0.4), transparent)' }} aria-hidden="true"/>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">Background</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            My <span className="gradient-text">Resume</span>
          </h2>
        </div>

        {/* Download button */}
        <div className="flex justify-center mb-10">
          <a href="#" className="flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25">
            <Download className="w-4 h-4" aria-hidden="true"/>
            Download Full Resume (PDF)
          </a>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 justify-center mb-10">
          {['training', 'education'].map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'glass-card text-muted-foreground hover:text-foreground'}`} aria-pressed={activeTab === tab}>
              {tab === 'training'
                ? <Briefcase className="w-4 h-4" aria-hidden="true"/>
                : <GraduationCap className="w-4 h-4" aria-hidden="true"/>}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60" aria-hidden="true"/>

          <div className="space-y-8">
            {activeTab === 'training'
            ? EXPERIENCE.map((exp, i) => (<div key={exp.title} className={`relative pl-16 transition-all duration-700 ${animate ? 'animate-slide-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
                    {/* Dot */}
                    <div className="absolute left-[18px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background z-10 transition-transform hover:scale-125" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}80` }} aria-hidden="true"/>
                    <div className="glass-card rounded-2xl p-6 border-border/50 hover:border-primary/30 transition-all hover:-translate-y-0.5 group">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-foreground">{exp.title}</h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-muted-foreground">{exp.period}</span>
                          <div className="text-xs text-muted-foreground mt-0.5">{exp.type}</div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((point, j) => (<li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true"/>
                            {point}
                          </li>))}
                      </ul>
                    </div>
                  </div>))
            : EDUCATION.map((edu, i) => (<div key={edu.degree} className={`relative pl-16 transition-all duration-700 ${animate ? 'animate-slide-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: `${i * 150}ms` }}>
                    <div className="absolute left-[18px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background z-10" style={{ background: edu.color, boxShadow: `0 0 10px ${edu.color}80` }} aria-hidden="true"/>
                    <div className="glass-card rounded-2xl p-6 border-border/50 hover:border-primary/30 transition-all hover:-translate-y-0.5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-bold text-foreground">{edu.degree}</h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: edu.color }}>{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                          <div className="text-xs text-primary font-mono mt-0.5">{edu.grade}</div>
                        </div>
                      </div>
                    </div>
                  </div>))}
          </div>
        </div>
      </div>
    </section>);
}
