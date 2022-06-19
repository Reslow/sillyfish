import type { Card } from "./models/card.server";

export type CardItem = Pick<Card, "id" | "question" | "answer">;

export type CardItems = CardItem[];
