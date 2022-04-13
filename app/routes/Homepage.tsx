import { Form } from "remix";

export default function Homepage() {
  return (
    <div className="container mx-auto h-screen  bg-blue-300">
      <h1 className="text-white">create a new flashcard deck</h1>
      <form>
        <p>Create card deck</p>
        <input className="border placeholder-gray-500" placeholder="Title " />
        <button>start building flashcard deck</button>
      </form>
      <div className="questionsAndAnswers">
        <form>
          <textarea
            className="placeholder-gray-500"
            placeholder="Set Question"
          />
          <textarea className="placeholder-gray-500" placeholder="Set Answer" />
          <button>Add</button>
        </form>
        <section className="displayDeck"></section>
      </div>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
