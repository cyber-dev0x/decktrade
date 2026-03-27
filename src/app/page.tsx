"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketplaceSection from "@/components/MarketplaceSection";
import CollectionSection from "@/components/CollectionSection";
import TradeSection from "@/components/TradeSection";

const GITHUB_URL = "https://github.com/cyber-dev0x/decktrade";

interface Card {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  emoji: string;
  content: React.ReactNode | null;
  gradient: string;
}

const PARTICLE_POSITIONS = [
  { top: "20%", left: "10%", size: 3, delay: 0 },
  { top: "40%", left: "85%", size: 4, delay: 1.2 },
  { top: "70%", left: "15%", size: 2, delay: 0.7 },
  { top: "15%", left: "70%", size: 3, delay: 2 },
  { top: "85%", left: "60%", size: 2, delay: 0.3 },
  { top: "55%", left: "50%", size: 5, delay: 1.5 },
  { top: "30%", left: "30%", size: 2, delay: 0.9 },
  { top: "65%", left: "80%", size: 3, delay: 1.8 },
];

export default function Home() {
  const [thrownCards, setThrownCards] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards: Card[] = [
    {
      id: "intro",
      label: "Welcome",
      title: "This is DeckTrade.",
      subtitle: "Trade digital cards like you're holding them.",
      emoji: "🃏",
      content: null,
      gradient: "from-purple-900/60 to-indigo-900/60",
    },
    {
      id: "idea",
      label: "The Idea",
      title: "Buy. Sell. Trade.",
      subtitle: "Digital collectibles with real-world trading energy.",
      emoji: "💡",
      content: null,
      gradient: "from-blue-900/60 to-cyan-900/60",
    },
    {
      id: "marketplace",
      label: "Marketplace",
      title: "Live Listings",
      subtitle: "Rare cards, live prices, real demand.",
      emoji: "🏪",
      content: <MarketplaceSection />,
      gradient: "from-emerald-900/60 to-teal-900/60",
    },
    {
      id: "collection",
      label: "Collection",
      title: "Your Deck",
      subtitle: "Everything you own, tracked and valued.",
      emoji: "📦",
      content: <CollectionSection />,
      gradient: "from-orange-900/60 to-amber-900/60",
    },
    {
      id: "trade",
      label: "Trade",
      title: "Open Offers",
      subtitle: "P2P trades, fair exchanges, instant deals.",
      emoji: "🤝",
      content: <TradeSection />,
      gradient: "from-rose-900/60 to-pink-900/60",
    },
  ];

  const activeCards = cards.filter((c) => !thrownCards.has(c.id));
  const topCard = activeCards[0];

  const throwCard = () => {
    if (!topCard) return;
    setThrownCards((prev) => new Set([...prev, topCard.id]));
    setCurrentIndex((prev) => prev + 1);
  };

  const resetDeck = () => {
    setThrownCards(new Set());
    setCurrentIndex(0);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#07070f] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(30,58,138,0.12)_0%,transparent_50%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating particles */}
        {PARTICLE_POSITIONS.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-400/20"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🃏</span>
          <span className="font-bold text-white text-lg tracking-tight">DeckTrade</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <button className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Main deck area */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 z-10 relative">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                thrownCards.has(card.id)
                  ? "w-8 bg-purple-500"
                  : i === currentIndex
                  ? "w-12 bg-white"
                  : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Card stack */}
        <div className="relative w-full max-w-2xl" style={{ minHeight: 580 }}>
          <AnimatePresence mode="popLayout">
            {activeCards.map((card, stackIndex) => (
              <motion.div
                key={card.id}
                className="absolute inset-x-0"
                style={{
                  zIndex: activeCards.length - stackIndex,
                  transformOrigin: "center bottom",
                }}
                initial={{ y: -60, opacity: 0, scale: 0.9 }}
                animate={{
                  y: stackIndex * -6,
                  scale: 1 - stackIndex * 0.025,
                  opacity: 1,
                  rotateZ: stackIndex % 2 === 0 ? stackIndex * 0.8 : -stackIndex * 0.8,
                }}
                exit={{
                  y: [0, -30, 900],
                  rotateZ: [0, Math.random() > 0.5 ? 20 : -20],
                  opacity: [1, 1, 0],
                  scale: [1, 1.02, 0.85],
                  transition: { duration: 0.65, ease: "easeIn" },
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                <DeckCard
                  card={card}
                  isTop={stackIndex === 0}
                  onThrow={throwCard}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {activeCards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-white mb-2">Deck cleared!</h2>
              <p className="text-slate-400 mb-6">You've seen everything DeckTrade has to offer.</p>
              <button
                onClick={resetDeck}
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-2xl transition-colors"
              >
                Shuffle & Restart
              </button>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        {activeCards.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 text-sm mt-6 text-center"
          >
            Click the card to flip it — or press{" "}
            <kbd className="bg-white/10 text-slate-400 px-2 py-0.5 rounded text-xs font-mono">Space</kbd>
          </motion.p>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 py-3 flex items-center justify-between z-50 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <span className="text-xs text-slate-600">© 2024 DeckTrade</span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          View on GitHub →
        </a>
      </footer>
    </div>
  );
}

// Individual deck card component
function DeckCard({
  card,
  isTop,
  onThrow,
}: {
  card: { id: string; label: string; title: string; subtitle?: string; emoji: string; content: React.ReactNode | null; gradient: string };
  isTop: boolean;
  onThrow: () => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / (rect.height / 2)) * -8);
    setRotateY(((x - rect.width / 2) / (rect.width / 2)) * 8);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  return (
    <motion.div
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      animate={{ rotateX: isTop ? rotateX : 0, rotateY: isTop ? rotateY : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div
        className={`relative rounded-3xl border border-white/10 overflow-hidden cursor-pointer ${
          isTop ? "cursor-pointer" : "cursor-default"
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(15,15,35,0.97) 0%, rgba(8,8,20,0.99) 100%)`,
          boxShadow: isTop && isHovered
            ? "0 40px 100px rgba(0,0,0,0.9), 0 0 80px rgba(168,85,247,0.12)"
            : "0 25px 70px rgba(0,0,0,0.7)",
        }}
        onClick={isTop ? onThrow : undefined}
      >
        {/* Top gradient band */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />

        {/* Glow on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isTop && isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(168,85,247,0.06) 0%, transparent 65%)`,
          }}
        />

        <div className="p-8">
          {/* Card header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-1">
                {card.label}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{card.title}</h2>
              {card.subtitle && (
                <p className="text-slate-400 mt-2 text-base">{card.subtitle}</p>
              )}
            </div>
            <div className="text-4xl ml-4 flex-shrink-0">{card.emoji}</div>
          </div>

          {/* Card content or intro visual */}
          {card.content ? (
            <div className="max-h-[380px] overflow-y-auto pr-1 -mr-1">
              {card.content}
            </div>
          ) : (
            <IntroVisual cardId={card.id} />
          )}

          {/* Footer */}
          {isTop && (
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-slate-600">Click anywhere to flip</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Swipe to next</span>
                <span>→</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function IntroVisual({ cardId }: { cardId: string }) {
  if (cardId === "intro") {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: "🃏", label: "Cards" },
          { emoji: "⚡", label: "Trades" },
          { emoji: "💎", label: "Collect" },
          { emoji: "🏪", label: "Market" },
          { emoji: "🔥", label: "Rare" },
          { emoji: "✨", label: "Holo" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/5 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-xs text-slate-400">{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (cardId === "idea") {
    return (
      <div className="space-y-3">
        {[
          { icon: "🛒", title: "Buy", desc: "Discover cards at market price or below" },
          { icon: "💸", title: "Sell", desc: "List your cards and name your price" },
          { icon: "🔄", title: "Trade", desc: "P2P exchanges with any collector" },
          { icon: "📈", title: "Track", desc: "Watch your portfolio value grow" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-sm text-slate-400">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
