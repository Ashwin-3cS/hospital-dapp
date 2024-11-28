"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-gray-300 rounded-full"
          animate={{
            x: [particle.x, particle.x + Math.random() * 100 - 50],
            y: [particle.y, particle.y + Math.random() * 100 - 50],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-black">
          Secure Healthcare Data Management on Blockchain
        </h1>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
            Patient Login/Register
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
            Hospital Login/Register
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
            Pharmacy Login/Register
          </Button>
        </div>
      </div>
    </section>
  );
}
