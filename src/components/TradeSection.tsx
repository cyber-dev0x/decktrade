"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRADE_OFFERS, RARITY_COLORS, RARITY_BORDER } from "@/data/cards";
import { TradeOffer } from "@/types";

export default function TradeSection() {
  const [offers, setOffers] = useState(TRADE_OFFERS);
  const [lastAction, setLastAction] = useState<{ id: string; action: "accepted" | "declined" } | null>(null);

  const handleAccept = (id: string) => {
    setLastAction({ id, action: "accepted" });
    setTimeout(() => {
      setOffers((prev) => prev.filter((o) => o.id !== id));
      setLastAction(null);
    }, 600);
  };

  const handleDecline = (id: string) => {
    setLastAction({ id, action: "declined" });
    setTimeout(() => {
      setOffers((prev) => prev.filter((o) => o.id !== id));
      setLastAction(null);
    }, 600);
  };

  return (
    <div>
      {/* Header stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Open Offers", value: offers.length, icon: "📬" },
          { label: "Completed", value: 47, icon: "✅" },
          { label: "Trade Value", value: "$12.4K", icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
            <div className="text-lg mb-1">{s.icon}</div>
            <div className="text-white font-bold">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trade offers */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Incoming Offers</div>
        <AnimatePresence>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              action={lastAction?.id === offer.id ? lastAction.action : null}
              onAccept={() => handleAccept(offer.id)}
              onDecline={() => handleDecline(offer.id)}
            />
          ))}
        </AnimatePresence>
        {offers.length === 0 && (
          <div className="text-center py-8 text-slate-600">
            No pending offers
          </div>
        )}
      </div>

      {/* Make offer CTA */}
      <div className="mt-5 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-4 border border-purple-500/20 flex items-center justify-between">
        <div>
          <div className="text-white font-semibold">Make a Trade</div>
          <div className="text-xs text-slate-400">Offer your cards to any collector</div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
          New Offer
        </button>
      </div>
    </div>
  );
}

function OfferCard({
  offer,
  action,
  onAccept,
  onDecline,
}: {
  offer: TradeOffer;
  action: "accepted" | "declined" | null;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const card = offer.offering;
  const borderClass = RARITY_BORDER[card.rarity];
  const textClass = RARITY_COLORS[card.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: action ? 0 : 1,
        x: action === "accepted" ? 60 : action === "declined" ? -60 : 0,
        scale: action ? 0.95 : 1,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border ${borderClass} bg-white/5 p-4`}
    >
      <div className="flex items-start gap-3">
        {/* Card preview */}
        <div className="flex-shrink-0 w-12 h-16 rounded-lg bg-black/40 flex items-center justify-center text-2xl border border-white/10">
          {card.image}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white font-semibold text-sm">{card.name}</div>
              <div className={`text-xs ${textClass} font-semibold capitalize`}>{card.rarity}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">${card.price.toLocaleString()}</div>
              <div className={`text-xs ${card.priceChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {card.priceChange >= 0 ? "+" : ""}{card.priceChange}%
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>@{offer.from}</span>
            <span className="text-slate-600">wants</span>
            <span className="text-white font-medium">{offer.wanting}</span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-600">Expires in {offer.expiresIn}</span>
            <div className="flex gap-2">
              <button
                onClick={onDecline}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-900/30 text-red-400 hover:bg-red-800/50 transition-colors border border-red-800/30"
              >
                Decline
              </button>
              <button
                onClick={onAccept}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-900/30 text-green-400 hover:bg-green-800/50 transition-colors border border-green-800/30"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
