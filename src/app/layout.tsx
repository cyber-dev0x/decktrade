import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeckTrade — Trade digital cards like you're holding them",
  description: "A digital trading platform for collectible cards. Buy, sell, and trade with holographic physics-based card interactions.",
  openGraph: {
    title: "DeckTrade",
    description: "Trade digital cards like you're holding them.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
