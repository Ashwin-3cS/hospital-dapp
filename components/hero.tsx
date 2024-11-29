"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HospitalAuthModal } from "./hospital-auth-modal";
import { PatientAuthModal } from "./patient-auth-modal";

export function Hero() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number }[]
  >([]);
  const [isHospitalAuthModalOpen, setIsHospitalAuthModalOpen] = useState(false);
  const [isPatientAuthModalOpen, setIsPatientAuthModalOpen] = useState(false);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2, // Particle size between 2 and 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gray-400"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: ["-25%", "25%"],
              y: ["-25%", "25%"],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
              },
              y: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
              },
              opacity: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 5 + 5,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>
      <div className="text-center z-10 px-4">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-black"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Secure Healthcare Data Management on Blockchain
        </motion.h1>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setIsPatientAuthModalOpen(true)}
          >
            Patient Login/Register
          </Button>
          <Button
            className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setIsHospitalAuthModalOpen(true)}
          >
            Hospital Login/Register
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 transition-colors duration-300">
            Pharmacy Login/Register
          </Button>
        </motion.div>
      </div>
      <HospitalAuthModal
        isOpen={isHospitalAuthModalOpen}
        onClose={() => setIsHospitalAuthModalOpen(false)}
      />
      <PatientAuthModal
        isOpen={isPatientAuthModalOpen}
        onClose={() => setIsPatientAuthModalOpen(false)}
      />
    </section>
  );
}
