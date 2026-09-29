import React, { useEffect, useRef } from 'react';

export const OceanWaveCanvasOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let ripples: { x: number, y: number, radius: number, maxRadius: number, alpha: number }[] = [];
    let sonarRadius = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Undulating horizontal waves
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.5;
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 20) {
          // ENE drift is roughly moving right and up
          const yOffset = Math.sin(x * 0.01 + time + y * 0.05) * 5;
          ctx.lineTo(x, y + yOffset);
        }
        ctx.stroke();
      }

      // Ambient Water Drop Ripples
      if (Math.random() < 0.015) {
        ripples.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0,
          maxRadius: 30 + Math.random() * 50,
          alpha: 0.6
        });
      }

      ripples.forEach((r, i) => {
        r.radius += 0.5;
        r.alpha -= 0.006;
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, r.alpha)})`;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2); ctx.stroke();
        if (r.alpha <= 0 || r.radius >= r.maxRadius) ripples.splice(i, 1);
      });

      // Radial Sonar Ping in the center (approx slick origin)
      sonarRadius += 2.0;
      const maxSonarRadius = Math.max(width, height) / 1.5;
      const sonarAlpha = Math.max(0, 0.3 - (sonarRadius / maxSonarRadius) * 0.3);
      if (sonarRadius > maxSonarRadius) sonarRadius = 0;

      ctx.fillStyle = `rgba(0, 229, 255, ${sonarAlpha * 0.15})`;
      ctx.strokeStyle = `rgba(0, 229, 255, ${sonarAlpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, sonarRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      time -= 0.035; // Sine wave animation phase

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

  return <canvas ref={canvasRef} className="absolute inset-0 z-[450] pointer-events-none w-full h-full" />;
};
