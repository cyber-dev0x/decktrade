"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionCardProps {
  index: number;
  title: string;
  subtitle?: string;
  label?: string;
  children: React.ReactNode;
  isActive: boolean;
  isThrown: boolean;
  onThrow: () => void;
  stackOffset?: number;
  totalCards: number;
}

export default function SectionCard({
  index,
  title,
  subtitle,
  label,
  children,
  isActive,
  isThrown,
  onThrow,
  stackOffset = 0,
  totalCards,
}: SectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateX(((y - cy) / cy) * -8);
    setRotateY(((x - cx) / cx) * 8);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  const stackY = isThrown ? 0 : stackOffset * -3;
  const stackRotate = isThrown ? 0 : stackOffset * 1.5;

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full"
      style={{ perspective: 1200, zIndex: totalCards - index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ y: 0, rotateZ: stackRotate }}
      animate={
        isThrown
          ? {
              y: [-20, 800],
              rotateZ: [stackRotate, stackRotate + (Math.random() > 0.5 ? 15 : -15)],
              opacity: [1, 0],
              scale: [1, 0.8],
            }
          : isActive
          ? {
              y: stackY,
              rotateX,
              rotateY,
              rotateZ: stackRotate,
              scale: 1,
            }
          : {
              y: stackY,
              rotateZ: stackRotate,
              scale: 1,
            }
      }
      transition={
        isThrown
          ? { duration: 0.6, ease: "easeIn" }
          : { type: "spring", stiffness: 200, damping: 25 }
      }
      whileTap={isActive ? { scale: 0.98 } : undefined}
    >
      <div
        className="relative rounded-3xl border border-white/10 overflow-hidden cursor-pointer"
        style={{
          background: "linear-gradient(135deg, rgba(20,20,40,0.95) 0%, rgba(10,10,25,0.98) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: isActive && isHovered
            ? "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(168,85,247,0.15)"
            : "0 20px 60px rgba(0,0,0,0.6)",
        }}
        onClick={isActive ? onThrow : undefined}
      >
        {/* Glow overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isActive && isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {label && (
                <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1">
                  {label}
                </div>
              )}
              <h2 className="text-3xl font-bold text-white">{title}</h2>
              {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
            </div>
            {isActive && (
              <div className="flex flex-col items-end gap-1">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Click to flip</div>
                <div className="text-2xl">🃏</div>
              </div>
            )}
          </div>

          {/* Content */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
