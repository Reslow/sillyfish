import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getDeckListItems } from "~/models/deck.server";

type LoaderData = {
  deckListItems: Awaited<ReturnType<typeof getDeckListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const deckListItems = await getDeckListItems({ userId });
  return json<LoaderData>({ deckListItems });
};

export default function DecksPage() {
  const data = useLoaderData() as LoaderData;
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">flashCards</Link>
        </h1>
        <section className="flex items-center">
          <p className="pr-4">{user.email}</p>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        </section>
      </header>

      <main className=" h-full bg-white">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
        <div className="h-full border-r bg-red-50">
          <button className="m-2 rounded bg-blue-500">
            <Link to="new" className="block p-4 text-xl text-green-50">
              create +
            </Link>
          </button>

          <hr />

          {data.deckListItems.length === 0 ? (
            <p className="p-4">No deck of flashcards yet</p>
          ) : (
            <ol className="grid grid-cols-2 gap-4  p-2">
              {data.deckListItems.map((deck) => (
                <li key={deck.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `row text-l flex
                      h-28 items-center
                       justify-center rounded border-b bg-slate-100 p-4 text-center font-bold text-slate-500 shadow-3xl shadow-slate-600 ${
                         isActive ? "bg-white" : ""
                       }`
                    }
                    to={deck.id}
                  >
                    {deck.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>
    </div>
  );
}
