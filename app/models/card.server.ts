import type { User, Card } from "@prisma/client";
import { prisma } from "~/db.server";
export type { Card } from "@prisma/client";

export function getCard({
  id,
  userId,
}: Pick<Card, "id"> & {
  userId: User["id"];
}) {
  return prisma.deck.findFirst({
    where: { id, userId },
  });
}

export function getCardListItems({ userId }: { userId: User["id"] }) {
  return prisma.card.findMany({
    where: { userId },
    select: { id: true, question: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createCard({
  question,
  answer,
  userId,
}: Pick<Card, "question" | "answer"> & {
  userId: User["id"];
}) {
  return prisma.card.create({
    data: {
      question,
      answer,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
export function deleteCard({
  question,
  userId,
}: Pick<Card, "question" | "answer"> & { userId: User["id"] }) {
  return prisma.card.deleteMany({
    where: { question, userId },
  });
}
