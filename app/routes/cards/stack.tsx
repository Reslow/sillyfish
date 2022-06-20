import type { ActionFunction } from "@remix-run/node";
import { deleteCard } from "~/models/card.server";
import { json } from "@remix-run/node";

type ActionData = {
  errors?: {
    cardId?: string;
    deckId?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const cardId = formData.get("cardId");
  const deckId = formData.get("deckId");
  console.log(formData);
  console.log(cardId);
  console.log(deckId);

  if (typeof cardId !== "string" || cardId.length === 0) {
    return json<ActionData>(
      { errors: { cardId: "cardId is not valid" } },
      { status: 400 }
    );
  } else if (typeof deckId !== "string" || deckId.length === 0) {
    return json<ActionData>(
      { errors: { deckId: "deckId is not valid" } },
      { status: 400 }
    );
  }

  try {
    const card = await deleteCard({ id: cardId, deckId });
    console.log(card);
    return card;
  } catch (error) {
    console.log(error);
  }
};
