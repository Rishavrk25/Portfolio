'use client';
import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, BadgeCheck, Calendar } from 'lucide-react';
const CERTIFICATIONS = [
    {
        title: '6-Week MERN Full Stack Development',
        issuer: 'Gokboru Tech',
        date: "Jun '25 – Jul '25",
        credential: 'MERN-GOKBORU',
        color: 'oklch(0.72 0.22 200)',
        description: 'Comprehensive training covering MongoDB, Express.js, React, and Node.js to build production-grade full-stack web applications.',
        verified: true,
        link: '#',
    },
    {
        title: 'Cloud Computing Certification',
        issuer: 'NPTEL',
        date: "Apr '25",
        credential: 'NPTEL-CC-25',
        color: 'oklch(0.68 0.20 270)',
        description: 'Core cloud computing concepts including service models (IaaS, PaaS, SaaS), virtualization, and distributed systems from IIT/IISc faculty.',
        verified: true,
        link: '#',
    },
    {
        title: 'Data Structures & Algorithms Training',
        issuer: 'CipherSchools',
        date: "Jul '25",
        credential: 'CIPHER-DSA-25',
        color: 'oklch(0.65 0.22 145)',
        description: 'Covered arrays, linked lists, trees, graphs, recursion, DP, and time-complexity optimization. Hands-on practice on LeetCode and GFG.',
        verified: true,
        link: '#',
    },
];
export default function CertificationsSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    return (<section id="certifications" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Certifications section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.65 0.22 145 / 0.4), transparent)' }} aria-hidden="true"/>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">Credentials</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Industry-recognized certifications that validate my expertise in full-stack development, cloud computing, and data structures.
          </p>
        </div>

        {/* Certs grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, i) => (<div key={cert.title} className={`glass-card rounded-2xl p-6 border-border/50 hover:border-primary/30 group transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden ${animate ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 pointer-events-none -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity" style={{ background: cert.color }} aria-hidden="true"/>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40` }}>
                  <Award className="w-5 h-5" style={{ color: cert.color }} aria-hidden="true"/>
                </div>
                {cert.verified && (<span className="flex items-center gap-1 text-xs text-primary font-mono">
                    <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true"/>
                    Verified
                  </span>)}
              </div>

              <h3 className="text-sm font-bold text-foreground mb-1 leading-snug relative z-10">{cert.title}</h3>
              <p className="text-xs font-semibold mb-3 relative z-10" style={{ color: cert.color }}>{cert.issuer}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 relative z-10">{cert.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-border/40 relative z-10">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" aria-hidden="true"/>
                  {cert.date}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">#{cert.credential}</span>
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.title} certificate`} className="p-1 rounded-md text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-3.5 h-3.5"/>
                  </a>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
}
