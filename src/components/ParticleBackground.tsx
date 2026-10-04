import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 3;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Generate Stardust & Light particles
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      maxOpacity: number;
      pulseRate: number;
      pulsePhase: number;
      colorType: 'gold' | 'sapphire' | 'diamond';
      twinkle: boolean;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const colorType: 'gold' | 'sapphire' | 'diamond' = 
        typeRand > 0.65 ? 'gold' : typeRand > 0.3 ? 'sapphire' : 'diamond';

      const baseRad = Math.random() * 1.8 + 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRad,
        baseRadius: baseRad,
        speedY: -Math.random() * 0.35 - 0.08,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        maxOpacity: Math.random() * 0.4 + 0.5,
        pulseRate: Math.random() * 0.03 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        colorType,
        twinkle: Math.random() > 0.4
      });
    }

    // Volumetric Rays parameters
    const rays = [
      { angle: -0.25, width: 0.18, speed: 0.0006, opacity: 0.06 },
      { angle: 0.05, width: 0.22, speed: -0.0004, opacity: 0.08 },
      { angle: 0.32, width: 0.16, speed: 0.0005, opacity: 0.05 },
      { angle: -0.10, width: 0.28, speed: -0.0007, opacity: 0.07 },
    ];

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ethereal Volumetric God Rays from top center
      const sourceX = width * 0.5 + (mouseX - width * 0.5) * 0.08;
      const sourceY = -50;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      rays.forEach((ray, i) => {
        const currentAngle = ray.angle + Math.sin(time * ray.speed + i) * 0.08;
        const beamLength = height * 1.4;
        
        const endX1 = sourceX + Math.sin(currentAngle - ray.width) * beamLength;
        const endY1 = sourceY + Math.cos(currentAngle - ray.width) * beamLength;
        const endX2 = sourceX + Math.sin(currentAngle + ray.width) * beamLength;
        const endY2 = sourceY + Math.cos(currentAngle + ray.width) * beamLength;

        const grad = ctx.createLinearGradient(sourceX, sourceY, (endX1 + endX2) / 2, (endY1 + endY2) / 2);
        grad.addColorStop(0, `rgba(212, 230, 255, ${ray.opacity * 1.8})`);
        grad.addColorStop(0.3, `rgba(180, 210, 255, ${ray.opacity * 1.2})`);
        grad.addColorStop(0.7, `rgba(212, 175, 55, ${ray.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(7, 18, 37, 0)');

        ctx.beginPath();
        ctx.moveTo(sourceX, sourceY);
        ctx.lineTo(endX1, endY1);
        ctx.lineTo(endX2, endY2);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });
      ctx.restore();

      // 2. Draw Interactive Particles & Stars
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulsePhase += p.pulseRate;

        // Reset if drifted out of bounds
        if (p.y < -20) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Twinkle calculation
        const currentOpacity = p.twinkle
          ? (Math.sin(p.pulsePhase) * 0.5 + 0.5) * p.maxOpacity + 0.1
          : p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.colorType === 'gold') {
          ctx.fillStyle = `rgba(248, 224, 150, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
          ctx.shadowBlur = 10;
        } else if (p.colorType === 'sapphire') {
          ctx.fillStyle = `rgba(165, 200, 255, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(90, 155, 255, 0.7)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowBlur = 12;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Sparkle cross flare on larger bright particles
        if (p.radius > 1.8 && currentOpacity > 0.5) {
          ctx.strokeStyle = `rgba(255, 240, 200, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Luminous Multi-layered Gradient Mesh Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(30, 58, 105, 0.45) 0%, transparent 60%),
            radial-gradient(circle at 85% 25%, rgba(212, 175, 55, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 15% 70%, rgba(26, 68, 133, 0.25) 0%, transparent 55%),
            radial-gradient(circle at 50% 100%, rgba(13, 31, 60, 0.5) 0%, transparent 70%),
            linear-gradient(180deg, #050b16 0%, #081426 35%, #060e1c 70%, #03070f 100%)
          `
        }}
      />

      {/* Sacred Geometry / Fine Guilloche Pattern (Subtle luxury texture) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(212,175,55,0.4) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 40px 40px, 40px 40px',
        }}
      />

      {/* Canvas for rays and twinkling stardust */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
