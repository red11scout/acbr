import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function SparkleDust() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30 blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1.2, 0],
            y: [0, -20], // Float upward slightly
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

    </div>
  );
}
