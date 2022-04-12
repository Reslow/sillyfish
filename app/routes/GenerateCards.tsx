import { Form } from "remix";

export default function GenerateCards() {
  return (
    <div className="bg-blue-300">
      <h1 className="text-white">create a new flashcard deck</h1>
      <form>
        <p>lets form</p>
        <input type="text" className="text-blue-500" />
        <button>push the button</button>
      </form>
      <div>
        <p>Display cards here!</p>
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
