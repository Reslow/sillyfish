export default function Createdcards() {
  return (
    <div className="flex justify-center">
      <div className="block max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-3 text-center text-2xl font-medium text-black">
          Question nr
        </h1>
        <p className="mb-4 text-base text-gray-800">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <p className="mb-4 text-base text-gray-400">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          type="button"
          className="inline-block rounded-full bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg"
        >
          Delete
        </button>
        <button
          type="button"
          className="inline-block rounded-full bg-orange-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg"
        >
          edit
        </button>
      </div>
    </div>
  );
}
