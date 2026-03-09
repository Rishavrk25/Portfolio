'use client';
import { useEffect, useRef } from 'react';
export default function ParticleCanvas() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const particles = [];
        const PARTICLE_COUNT = 80;
        const CONNECTION_DIST = 120;
        function resize() {
            if (!canvas)
                return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        function createParticle() {
            return {
                x: Math.random() * (canvas?.width ?? 800),
                y: Math.random() * (canvas?.height ?? 600),
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: Math.random() * 1.8 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
            };
        }
        resize();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(createParticle());
        }
        let animId;
        function draw() {
            if (!ctx || !canvas)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += p.pulseSpeed;
                if (p.x < 0)
                    p.x = canvas.width;
                if (p.x > canvas.width)
                    p.x = 0;
                if (p.y < 0)
                    p.y = canvas.height;
                if (p.y > canvas.height)
                    p.y = 0;
                const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 220, 210, ${currentOpacity})`;
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(100, 220, 210, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        }
        draw();
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);
    return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true"/>;
}
