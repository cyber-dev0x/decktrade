"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RARITY_BG, RARITY_BORDER, RARITY_COLORS } from "@/data/cards";
import { CardListing } from "@/types";

interface TiltCardProps {
  card: CardListing;
  onClick?: () => void;
  className?: string;
  showOwned?: boolean;
  isThrown?: boolean;
}

export default function TiltCard({ card, onClick, className = "", showOwned, isThrown }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -15;
    const rotY = ((x - centerX) / centerX) * 15;
    setRotateX(rotX);
    setRotateY(rotY);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
    setIsHovered(false);
  }, []);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    onClick?.();
  };

  const rarityClass = RARITY_BG[card.rarity];
  const borderClass = RARITY_BORDER[card.rarity];
  const textClass = RARITY_COLORS[card.rarity];

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={handleClick}
      animate={
        isThrown
          ? { scale: 1.05, y: -8 }
          : isFlipped
          ? { rotateY: 180 }
          : { rotateX, rotateY, scale: isHovered ? 1.04 : 1 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Card front */}
      <div
        className={`relative w-full rounded-2xl border-2 ${rarityClass} ${borderClass} overflow-hidden`}
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Holographic shine layer */}
        {card.rarity === "legendary" && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168,85,247,0.6) 0%, transparent 60%)`,
            }}
          />
        )}
        {card.rarity === "rare" && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(59,130,246,0.6) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Card shine sweep */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(${glowX + glowY}deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="p-4 relative z-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-white text-sm leading-tight">{card.name}</h3>
              <span className={`text-xs font-semibold uppercase tracking-wider ${textClass}`}>
                {card.rarity}
              </span>
            </div>
            <span className="text-xs bg-black/30 px-2 py-1 rounded-lg text-slate-300 font-mono">
              {card.element}
            </span>
          </div>

          {/* Card art area */}
          <div
            className={`relative flex items-center justify-center rounded-xl mb-3 overflow-hidden`}
            style={{ height: 110 }}
          >
            <div className="absolute inset-0 opacity-30"
              style={{
                background: card.rarity === "legendary"
                  ? "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)"
                  : card.rarity === "rare"
                  ? "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(100,100,150,0.2) 0%, transparent 70%)"
              }}
            />
            <span className="text-5xl relative z-10" style={{ filter: "drop-shadow(0 0 12px currentColor)" }}>
              {card.image}
            </span>
            {card.rarity === "legendary" && (
              <div className="absolute inset-0 holographic opacity-10 pointer-events-none" />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-black/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wide">PWR</div>
              <div className="text-white font-bold text-sm">{card.power}</div>
              <div className="mt-1 h-1 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{ width: `${card.power}%` }}
                />
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-2 text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wide">DEF</div>
              <div className="text-white font-bold text-sm">{card.defense}</div>
              <div className="mt-1 h-1 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${card.defense}%` }}
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-bold text-lg">${card.price.toLocaleString()}</div>
              <div
                className={`text-xs font-semibold ${
                  card.priceChange >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {card.priceChange >= 0 ? "+" : ""}{card.priceChange}%
              </div>
            </div>
            {showOwned && card.owned && (
              <div className="bg-black/40 rounded-lg px-3 py-1.5 text-center">
                <div className="text-xs text-slate-500">Owned</div>
                <div className="text-white font-bold">×{card.owned}</div>
              </div>
            )}
            {!showOwned && (
              <div className="text-xs text-slate-500 truncate max-w-20 text-right">
                @{card.seller}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
