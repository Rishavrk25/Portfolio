'use client';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Star, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
const PROJECTS = [
    {
        title: 'E-Commerce Platform',
        description: 'A complete full-stack e-commerce website built for an international client with product catalog management and secure payment integration.',
        images: [
            '/ecommerce/Screenshot (123).png',
            '/ecommerce/Screenshot (124).png',
            '/ecommerce/Screenshot (125).png',
            '/ecommerce/Screenshot (126).png',
            '/ecommerce/Screenshot (127).png',
        ],
        points: [
            'Developed product catalog management with secure user authentication (login/signup).',
            'Integrated Razorpay payment gateway for seamless online transactions.',
            'Built RESTful APIs for efficient data handling and optimized database queries.',
        ],
        tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Razorpay API'],
        category: 'Full Stack',
        color: 'oklch(0.72 0.22 200)',
        featured: true,
        period: "Nov '25",
        liveUrl: 'https://priyankas-collection-frontend.onrender.com/',
        githubUrl: 'https://github.com/Rishavrk25/Ecommerce-website',
    },
    {
        title: 'AI Meme Generator',
        description: 'An AI-powered meme generator that uses emotion-based inputs and the Gemini API to create dynamic, personalized memes.',
        images: [
            '/meme/Screenshot (130).png',
            '/meme/Screenshot (131).png',
            '/meme/Screenshot (132).png',
        ],
        points: [
            'Built emotion-based meme generation pipeline using Gemini API.',
            'Designed a dynamic and interactive UI for seamless meme creation.',
            'Integrated AI-driven content processing for context-aware outputs.',
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Gemini API'],
        category: 'AI',
        color: 'oklch(0.68 0.20 270)',
        featured: true,
        period: "Apr '25",
        liveUrl: 'https://meme-s5nr.onrender.com',
        githubUrl: 'https://github.com/Rishavrk25/meme',
    },
    {
        title: 'Bus Management System',
        description: 'A CRUD-based full-stack system to manage bus routes, passengers, and bookings with an admin dashboard and responsive UI.',
        images: [
            '/bluebus/Screenshot (133).png',
            '/bluebus/Screenshot (134).png',
            '/bluebus/Screenshot (135).png',
        ],
        points: [
            'Implemented CRUD operations for bus routes, passengers, and bookings.',
            'Built backend with PHP for data processing, validation, and admin dashboard.',
            'Designed normalized database schema ensuring data integrity.',
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        category: 'Full Stack',
        color: 'oklch(0.65 0.22 145)',
        featured: false,
        period: "Nov '24",
        liveUrl: '',
        githubUrl: 'https://github.com/Rishavrk25/blueBus',
    },
];
const CATEGORIES = ['All', 'Full Stack', 'AI'];

function ProjectSlideshow({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden group/slider border-b border-border/20 bg-muted/20">
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
            ))}
            
            {/* Bottom gradient for indicators */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

            {images.length > 1 && (
                <div className="z-20 absolute inset-0 pointer-events-none">
                    <button 
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white/90 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/60 hover:text-white pointer-events-auto backdrop-blur-sm"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white/90 opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/60 hover:text-white pointer-events-auto backdrop-blur-sm"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-auto">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/75'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProjectsSection() {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting)
            setAnimate(true); }, { threshold: 0.1 });
        if (sectionRef.current)
            observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);
    const filtered = activeCategory === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);
    return (<section id="projects" ref={sectionRef} className="relative py-24 px-6 overflow-hidden" aria-label="Projects section">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.68 0.20 270 / 0.4), transparent)' }} aria-hidden="true"/>
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" aria-hidden="true"/>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">What I&apos;ve built</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-balance">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Real-world projects I&apos;ve built — spanning e-commerce, AI tools, and management systems with full-stack technologies.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/30'}`} aria-pressed={activeCategory === cat}>
              {cat}
            </button>))}
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (<div key={project.title} className={`glass-card flex flex-col h-full rounded-2xl overflow-hidden border-border/50 hover:border-primary/35 transition-all duration-500 group cursor-pointer hover:-translate-y-2 ${animate ? 'animate-slide-up' : 'opacity-0'} ${project.featured ? 'ring-1 ring-primary/20' : ''}`} style={{ animationDelay: `${i * 100}ms` }} onMouseEnter={() => setHoveredId(project.title)} onMouseLeave={() => setHoveredId(null)}>
              {/* Top color bar */}
              <div className="h-1 w-full transition-all duration-300" style={{
                background: project.color,
                boxShadow: hoveredId === project.title ? `0 0 20px ${project.color}60` : 'none',
            }} aria-hidden="true"/>

              {/* Slideshow */}
              {project.images && project.images.length > 0 && (
                  <ProjectSlideshow images={project.images} />
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Badge + Period */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full border" style={{ color: project.color, borderColor: `${project.color}50`, background: `${project.color}12` }}>
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                    <Calendar className="w-3 h-3" aria-hidden="true"/>
                    {project.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                  {project.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-1 mb-4 flex-1">
                  {project.points.map((point, j) => (<li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true"/>
                      {point}
                    </li>))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (<span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-mono">
                      {tag}
                    </span>))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {project.featured && (<span className="flex items-center gap-1 text-yellow-400/80">
                        <Star className="w-3 h-3 fill-yellow-400/60" aria-hidden="true"/>
                        Featured
                      </span>)}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <Github className="w-4 h-4"/>
                    </a>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                        </span>
                        Live Preview
                        <ExternalLink className="w-3 h-3 ml-0.5"/>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <a href="https://github.com/Rishavrk25" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border-border/50 hover:border-primary/40 text-sm font-medium text-muted-foreground hover:text-foreground transition-all hover:scale-105">
            <Github className="w-4 h-4" aria-hidden="true"/>
            View all projects on GitHub
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true"/>
          </a>
        </div>
      </div>
    </section>);
}
