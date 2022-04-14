import Header from "./Header";
import Createdcards from "./Createdcards";
export default function Cardfactory() {
  return (
    <div>
      <Header />
      <div className=" mx-auto  max-w-5xl px-4 sm:px-6 lg:px-8 ">
        <h1 className="mb-10 text-center text-4xl font-medium text-black">
          ADD A NEW QUESTION CARD
        </h1>
        <div className=" mb-10 grid grid-cols-2 gap-10">
          <textarea
            rows={4}
            name="question"
            id="question"
            className="block w-full resize-none rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="set Question"
            defaultValue={""}
          />
          <textarea
            rows={4}
            name="Answer"
            id="Answer"
            className=" block w-full resize-none rounded-md border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="set Answer"
            defaultValue={""}
          />
        </div>
        <button
          type="button"
          className=" inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500	focus:ring-offset-2"
        >
          Add card
        </button>
      </div>
      <section>
        <h1>here is created cards</h1>
        <Createdcards />
      </section>
    </div>
  );
}
