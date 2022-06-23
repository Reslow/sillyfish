import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useFetcher } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { getCardListItems } from "~/models/card.server";
import type { Deck } from "~/models/deck.server";
import { deleteDeck } from "~/models/deck.server";
import { getDeck } from "~/models/deck.server";
import { requireUserId } from "~/session.server";
import type { CardItems } from "~/types";
import Modal from "../../components/Modal";

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
  const userId = await requireUserId(request);
  invariant(params.deckId, "deckId not found");

  await deleteDeck({ userId, id: params.deckId });

  return redirect("/decks");
};

export default function DeckDetailsPage() {
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = useState(true);
  const [missed, setMissed] = useState<CardItems>([]);
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    setShowModal(true);
  }
  function exitGame() {
    setCounter(0);
    setGameOver(true);
    setShowModal(false);
  }

  let displayQuestion = "";
  function getOneQuestion(arrayofcards: any) {
    if (counter < arrayofcards.length) {
      displayQuestion = arrayofcards[counter].question;
      return displayQuestion;
    }
  }
  const data = useLoaderData() as LoaderData;
  const fetcher = useFetcher();

  function increase() {
    if (counter < data.cardDeck.length) {
      setCounter((count) => count + 1);
    } else {
      exitGame();
    }
  }

  getOneQuestion(data.cardDeck);

  function handleAnswerInput(e: any) {
    setAnswer(e.target.value);
  }

  function handleSubmitAnswer() {
    increase();
    const findObject = data.cardDeck.find(
      (element) => element.question === displayQuestion
    );

    if (findObject) {
      if (findObject.answer == answer) {
        console.log("match");
      } else {
        console.log("miss");
        setMissed((oldArr) => [...oldArr, findObject]);
      }
      setAnswer("");
    } else return;
  }

  return (
    <div>
      {gameOver && (
        <Modal
          open={open}
          setOpen={setOpen}
          missed={missed}
          deckLength={data.cardDeck.length}
        />
      )}

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
        <input type="text" name="question" />
        <input type="text" name="answer" />
        <button type="submit" className="btn">
          add
        </button>
      </fetcher.Form>

      {!showModal ? (
        <section>
          <Form>
            <button
              className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              onClick={startGame}
              type="button"
            >
              play game
            </button>
          </Form>

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
      ) : (
        <section>
          <h1>Lets play a game</h1>
          <section>
            <section>
              <h2 id="question">{displayQuestion}</h2>
              <button
                className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                onClick={handleSubmitAnswer}
              >
                Submit
              </button>
            </section>

            <input
              type="text"
              id="answer"
              onChange={handleAnswerInput}
              value={answer}
            />
          </section>
          <form>
            <button onClick={exitGame}>back</button>
          </form>
        </section>
      )}
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
