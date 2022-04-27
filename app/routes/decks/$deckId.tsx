import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Deck } from "~/models/deck.server";
import { deleteDeck } from "~/models/deck.server";
import { getDeck } from "~/models/deck.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  deck: Deck;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  console.log(params);

  invariant(params.deckId, "decks not found");

  const deck = await getDeck({ userId, id: params.deckId });
  if (!deck) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ deck });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.deckId, "deckId not found");

  await deleteDeck({ userId, id: params.deckId });

  return redirect("/decks");
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.deck.title}</h3>
      <p className="py-6">{data.deck.title}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Deck not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
