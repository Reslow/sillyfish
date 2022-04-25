import type { User, Deck } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Deck } from "@prisma/client";

export function getDeck({
  id,
  userId,
}: Pick<Deck, "id"> & {
  userId: User["id"];
}) {
  return prisma.deck.findFirst({
    where: { id, userId },
  });
}

export function getDeckListItems({ userId }: { userId: User["id"] }) {
  return prisma.deck.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createDeck({
  title,
  userId,
}: Pick<Deck, "title"> & {
  userId: User["id"];
}) {
  return prisma.deck.create({
    data: {
      title,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteDeck({
  id,
  userId,
}: Pick<Deck, "id"> & { userId: User["id"] }) {
  return prisma.deck.deleteMany({
    where: { id, userId },
  });
}
