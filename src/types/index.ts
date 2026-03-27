export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export interface CardListing {
  id: string;
  name: string;
  rarity: Rarity;
  price: number;
  priceChange: number;
  power: number;
  defense: number;
  element: string;
  seller: string;
  image: string;
  owned?: number;
  flipped?: boolean;
}

export interface TradeOffer {
  id: string;
  from: string;
  offering: CardListing;
  wanting: string;
  expiresIn: string;
  status: "pending" | "accepted" | "declined";
}
