import Navbar from "./Navbar";
export default function Header() {
  return (
    <section className="flex w-2/4 justify-between p-1">
      <Navbar />
      <h1>Flashcard</h1>
    </section>
  );
}
