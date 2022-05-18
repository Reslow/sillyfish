import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

import type { Card } from "~/models/card.server";
import { deleteCard } from "~/models/card.server";
import { getCard } from "~/models/card.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  card: Card;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  console.log(params);

  invariant(params.cardId, "card not found");

  const card = await getCard({ userId, id: params.cardId });
  if (!card) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ card });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.cardId, "cardId not found");

  await deleteCard({ userId, id: params.cardId });

  return redirect("/cards");
};

export default function CardId() {
  const data = useLoaderData() as LoaderData;
  return (
    <div>
      <h3 className="text-2xl font-bold">{data.card.question}</h3>
      <h3 className="text-2xl font-bold">{data.card.answer}</h3>

      <form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          edit
        </button>
      </form>
    </div>
  );
}
