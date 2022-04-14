import { Link } from "remix";
import Header from "./Header";

export default function Homepage() {
  return (
    <section>
      <Header />
      <div className="container mx-auto h-screen  ">
        <h1 className="text-white">create a new flashcard deck</h1>
        <Link
          className="text-blue-500 underline"
          to={{
            pathname: "/Cardfactory",
          }}
        >
          create new card
        </Link>
      </div>
    </section>
  );
}
