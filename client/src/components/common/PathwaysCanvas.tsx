import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  color: string;
}

export const PathwaysCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Node colors: electric blue, soft violet, cyan accent
    const colors = ['#4F7CFF', '#8B5CF6', '#38BDF8', '#818CF8'];

    const nodeCount = Math.min(36, Math.floor((width * height) / 22000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 2.5 + 2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius,
        baseRadius: radius,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const mouse = { x: -1000, y: -1000, maxDist: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital trajectory curves
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(79, 124, 255, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.ellipse(width * 0.7, height * 0.45, width * 0.35, height * 0.28, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
      ctx.ellipse(width * 0.3, height * 0.6, width * 0.4, height * 0.35, -Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Move
        n1.x += n1.vx;
        n1.y += n1.vy;

        // Bounce boundaries
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Mouse interactive distance
        const dxMouse = n1.x - mouse.x;
        const dyMouse = n1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.maxDist) {
          const force = (mouse.maxDist - distMouse) / mouse.maxDist;
          n1.x += (dxMouse / distMouse) * force * 1.5;
          n1.y += (dyMouse / distMouse) * force * 1.5;
          n1.radius = n1.baseRadius + force * 2.5;
        } else {
          n1.radius = n1.baseRadius + Math.sin(time * 2 + n1.pulsePhase) * 0.6;
        }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Traveling energy pulse dot
            const pulsePos = (Math.sin(time * 1.8 + i + j) + 1) / 2;
            const px = n1.x + (n2.x - n1.x) * pulsePos;
            const py = n1.y + (n2.y - n1.y) * pulsePos;

            ctx.beginPath();
            ctx.fillStyle = `rgba(79, 124, 255, ${alpha * 1.5})`;
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw node
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(n1.x, n1.y, 0, n1.x, n1.y, n1.radius * 2);
        gradient.addColorStop(0, n1.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(n1.x, n1.y, n1.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.arc(n1.x, n1.y, n1.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
