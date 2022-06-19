import { Link } from "@remix-run/react";

export default function DeckIndexPage() {
  return (
    <p>
      No deck selected. Select a deck below, or{" "}
      <Link to="/cards/newcard" className="text-blue-500 underline">
        add a new card to your deck
      </Link>
    </p>
  );
}
