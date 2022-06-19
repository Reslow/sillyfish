import type { Card, Deck } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Card } from "@prisma/client";

export function getCard({
  id,
  deckId,
}: Pick<Card, "id"> & {
  deckId: Deck["id"];
}) {
  return prisma.card.findFirst({
    where: { id, deckId },
  });
}

export function getCardListItems({ deckId }: { deckId: Deck["id"] }) {
  return prisma.card.findMany({
    where: { deckId },
    select: { id: true, question: true, answer: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createCard({
  question,
  answer,
  deckId,
}: Pick<Card, "question" | "answer"> & {
  deckId: Deck["id"];
}) {
  return prisma.card.create({
    data: {
      question,
      answer,
      deck: {
        connect: {
          id: deckId,
        },
      },
    },
  });
}

export function deleteCard({
  id,
  deckId,
}: Pick<Card, "id"> & { deckId: Deck["id"] }) {
  return prisma.card.deleteMany({
    where: { id, deckId },
  });
}
