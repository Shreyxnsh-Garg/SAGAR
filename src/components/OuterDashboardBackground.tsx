import React, { useEffect, useRef } from 'react';

export const OuterDashboardBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let ripples: { x: number, y: number, radius: number, alpha: number }[] = [];
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Faint tactical sonar grid dots
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      for (let x = 0; x <= width; x += 30) {
        for (let y = 0; y <= height; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Subtle slow-expanding ripples
      if (Math.random() < 0.005) {
        ripples.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0,
          alpha: 0.15
        });
      }

      ripples.forEach((r, i) => {
        r.radius += 0.3;
        r.alpha -= 0.0005;
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, r.alpha)})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); 
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); 
        ctx.stroke();
        
        if (r.alpha <= 0 || r.radius > 250) {
          ripples.splice(i, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />;
};
