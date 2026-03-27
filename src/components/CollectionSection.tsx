"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { COLLECTION_CARDS, RARITY_COLORS } from "@/data/cards";

export default function CollectionSection() {
  const totalValue = COLLECTION_CARDS.reduce((sum, c) => sum + c.price * (c.owned || 1), 0);
  const totalCards = COLLECTION_CARDS.reduce((sum, c) => sum + (c.owned || 1), 0);

  return (
    <div>
      {/* Portfolio summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="col-span-2 bg-gradient-to-br from-purple-900/40 to-purple-800/20 rounded-2xl p-4 border border-purple-500/20">
          <div className="text-xs text-purple-300 uppercase tracking-wide mb-1">Portfolio Value</div>
          <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-green-400 mt-1">+12.4% this week</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-white/5 rounded-xl p-3 text-center flex-1">
            <div className="text-xs text-slate-500 mb-1">Cards</div>
            <div className="text-xl font-bold text-white">{totalCards}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center flex-1">
            <div className="text-xs text-slate-500 mb-1">Unique</div>
            <div className="text-xl font-bold text-white">{COLLECTION_CARDS.length}</div>
          </div>
        </div>
      </div>

      {/* Rarity breakdown */}
      <div className="flex gap-2 mb-5">
        {(["legendary", "rare", "uncommon", "common"] as const).map((rarity) => {
          const count = COLLECTION_CARDS.filter((c) => c.rarity === rarity).length;
          if (count === 0) return null;
          return (
            <div key={rarity} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${
                rarity === "legendary" ? "bg-purple-400" :
                rarity === "rare" ? "bg-blue-400" :
                rarity === "uncommon" ? "bg-green-400" : "bg-slate-400"
              }`} />
              <span className={`text-xs capitalize ${RARITY_COLORS[rarity]}`}>{rarity}</span>
              <span className="text-xs text-slate-600">×{count}</span>
            </div>
          );
        })}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3">
        {COLLECTION_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
          >
            <TiltCard card={card} showOwned />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
