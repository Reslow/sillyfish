import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useFetcher } from "@remix-run/react";

import invariant from "tiny-invariant";
import { getCardListItems } from "~/models/card.server";
import type { Deck } from "~/models/deck.server";
import { deleteDeck } from "~/models/deck.server";
import { getDeck } from "~/models/deck.server";
import { requireUserId } from "~/session.server";
import type { CardItems } from "~/types";

type LoaderData = {
  deck: Deck;
  cardDeck: CardItems;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  invariant(params.deckId, "decks not found");

  const deck = await getDeck({ userId, id: params.deckId });
  if (!deck) {
    throw new Response("Not Found", { status: 404 });
  }

  const id = params.deckId;
  const cardDeck = await getCardListItems({ deckId: id });
  return json<LoaderData>({ deck, cardDeck });
};

export const action: ActionFunction = async ({ request, params }) => {
  // console.log("params" + request);
  const userId = await requireUserId(request);
  invariant(params.deckId, "deckId not found");

  await deleteDeck({ userId, id: params.deckId });

  return redirect("/decks");
};

export default function DeckDetailsPage() {
  const data = useLoaderData() as LoaderData;

  const fetcher = useFetcher();

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
      <fetcher.Form method="post" action="/cards/newcard">
        <input type="hidden" name="deckId" value={data.deck.id} />
        <input type="text" name="answer" />
        <input type="text" name="question" />
        <button type="submit" className="btn">
          add
        </button>
      </fetcher.Form>

      <section>
        {data.cardDeck.map((item: any, i: any) => (
          <section key={item.id}>
            <h2> {item.question}</h2>
            <h2> {item.answer}</h2>
            <fetcher.Form method="post" action="/cards/stack">
              <input type="hidden" name="cardId" value={item.id} />
              <input type="hidden" name="deckId" value={data.deck.id} />

              <button
                type="submit"
                className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Delete
              </button>
            </fetcher.Form>
          </section>
        ))}
      </section>
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
