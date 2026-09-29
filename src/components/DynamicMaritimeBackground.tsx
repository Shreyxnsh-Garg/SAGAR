import React, { useEffect, useRef } from 'react';

export const DynamicMaritimeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particles (ocean current drift motes)
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.2 + Math.random() * 0.3, // ENE drift
      vy: -0.05 - Math.random() * 0.1,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1
    }));

    // Ripples
    let ripples: { x: number, y: number, radius: number, maxRadius: number, alpha: number }[] = [];

    // Radar
    let radarAngle = 0;

    const render = () => {
      // Clear with gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#070d1e');
      grad.addColorStop(1, '#0b1938');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(30, 58, 138, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      // Crosshairs
      ctx.fillStyle = 'rgba(30, 58, 138, 0.5)';
      for (let x = 0; x <= width; x += 80) {
        for (let y = 0; y <= height; y += 80) {
          ctx.fillRect(x - 2, y - 2, 4, 4);
        }
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });

      // Ripples
      if (Math.random() < 0.02) {
        ripples.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0,
          maxRadius: 50 + Math.random() * 100,
          alpha: 0.6
        });
      }
      ripples.forEach((r, i) => {
        r.radius += 0.5;
        r.alpha -= 0.003;
        ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, r.alpha)})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
        if (r.alpha <= 0 || r.radius >= r.maxRadius) ripples.splice(i, 1);
      });

      // Radar Sweep
      const cx = width / 2;
      const cy = height / 2;
      const radarRadius = Math.max(width, height) / 1.5;
      
      const sweepGrad = ctx.createConicGradient(radarAngle, cx, cy);
      sweepGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      sweepGrad.addColorStop(0.1, 'rgba(0, 229, 255, 0.15)');
      sweepGrad.addColorStop(0.15, 'rgba(0, 229, 255, 0)');
      
      ctx.fillStyle = sweepGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radarRadius, 0, Math.PI * 2);
      ctx.fill();

      // Scanner line
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(radarAngle + 0.1) * radarRadius, cy + Math.sin(radarAngle + 0.1) * radarRadius);
      ctx.stroke();

      radarAngle += 0.015;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};
