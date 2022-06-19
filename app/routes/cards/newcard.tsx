import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createCard } from "~/models/card.server";

type ActionData = {
  errors?: {
    question?: string;
    answer?: string;
    deckId?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const question = formData.get("question");
  const answer = formData.get("answer");
  const deckId = formData.get("deckId");
  console.log(formData);

  if (typeof question !== "string" || question.length === 0) {
    return json<ActionData>(
      { errors: { question: "question is required" } },
      { status: 400 }
    );
  } else if (typeof answer !== "string" || answer.length === 0) {
    return json<ActionData>(
      { errors: { answer: "answer is required" } },
      { status: 400 }
    );
  } else if (typeof deckId !== "string" || deckId.length === 0) {
    return json<ActionData>(
      { errors: { deckId: " is required" } },
      { status: 400 }
    );
  }
  try {
    const card = await createCard({ question, answer, deckId });
    return card;
  } catch (error) {
    console.log(error);
  }
};
