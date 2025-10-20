"use client";
import React, { useId, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export const SparklesCore: React.FC<SparklesProps> = (props) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 1,
    maxSize = 3,
    speed = 1,
    particleColor = "#FFF",
    particleDensity = 100,
  } = props;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const generatedId = useId();
  const effectId = id || generatedId;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const updateDimensions = () => {
        if (canvas.parentElement) {
          setDimensions({
            width: canvas.parentElement.offsetWidth,
            height: canvas.parentElement.offsetHeight,
          });
        }
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize particles
    particles.current = [];
    const particleCount = Math.floor((dimensions.width * dimensions.height) / particleDensity);

    for (let i = 0; i < particleCount; i++) {
      particles.current.push(new Particle(canvas, ctx, particleColor, minSize, maxSize));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle) => {
        particle.update(speed);
        particle.draw();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, particleColor, minSize, maxSize, speed, particleDensity]);

  return (
    <div className={cn("relative", className)} style={{ background }}>
      <canvas
        ref={canvasRef}
        id={effectId}
        className="absolute inset-0"
        style={{
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

class Particle {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  fadeSpeed: number;
  fadeDirection: number;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    color: string,
    minSize: number,
    maxSize: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = color;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.02 + 0.01;
    this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
  }

  update(speed: number) {
    this.x += this.speedX * speed;
    this.y += this.speedY * speed;

    // Wrap around screen
    if (this.x > this.canvas.width) this.x = 0;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.y > this.canvas.height) this.y = 0;
    if (this.y < 0) this.y = this.canvas.height;

    // Update opacity for twinkling effect
    this.opacity += this.fadeDirection * this.fadeSpeed;
    if (this.opacity <= 0 || this.opacity >= 1) {
      this.fadeDirection *= -1;
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}
