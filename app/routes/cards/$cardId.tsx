export default function cardId() {
  return (
    <div>
      <h3 className="text-2xl font-bold">cardID</h3>
      <form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          edit
        </button>
      </form>
    </div>
  );
}
