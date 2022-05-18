import { Link } from "@remix-run/react";

export default function DeckIndexPage() {
  return (
    <>
      <p>
        No deck selected. Select a deck below, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new Deck!!!.
        </Link>
      </p>
    </>
  );
}
