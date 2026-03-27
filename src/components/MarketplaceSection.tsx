"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import { MARKETPLACE_CARDS, RARITY_COLORS } from "@/data/cards";
import { Rarity } from "@/types";

const FILTERS: Array<Rarity | "all"> = ["all", "legendary", "rare", "uncommon", "common"];

export default function MarketplaceSection() {
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const [sortBy, setSortBy] = useState<"price" | "rarity" | "change">("rarity");

  const filtered = MARKETPLACE_CARDS
    .filter((c) => filter === "all" || c.rarity === filter)
    .sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "change") return b.priceChange - a.priceChange;
      const order = { legendary: 0, rare: 1, uncommon: 2, common: 3 };
      return order[a.rarity] - order[b.rarity];
    });

  return (
    <div>
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Live Market</span>
        <span className="text-xs text-slate-500 ml-auto">{MARKETPLACE_CARDS.length} listings</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
              filter === f
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {(["rarity", "price", "change"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                sortBy === s
                  ? "bg-white/15 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {filtered.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TiltCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "24h Volume", value: "$284K", change: "+18%" },
          { label: "Listings", value: "1,247", change: "+34" },
          { label: "Avg Price", value: "$1,604", change: "+5.2%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{stat.label}</div>
            <div className="text-white font-bold">{stat.value}</div>
            <div className="text-green-400 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
