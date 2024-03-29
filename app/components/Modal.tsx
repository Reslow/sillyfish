import { Fragment } from "react";
import type { CardItems } from "~/types";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation } from "@remix-run/react";
import { redirect } from "@remix-run/server-runtime";

type Props = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  missed: CardItems;
  deckLength: number;
};

export default function Modal({ open, setOpen, missed, deckLength }: Props) {
  const location = useLocation();
  function handleClose() {
    setOpen(false);
    redirect(location.pathname);
    console.log(missed);
    console.log(deckLength);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(true)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex w-full items-center justify-center ">
                    <h1
                      className="h-6 w-16 text-center font-bold text-green-600"
                      aria-hidden="true"
                    >
                      Result
                    </h1>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <div className="mt-2">
                      <p className="mb-4 text-sm text-gray-500">
                        You answered
                        {missed.length - deckLength} of
                        {deckLength} correct!
                      </p>
                      {missed.length > 0 && (
                        <div>
                          you need practise on...
                          {missed.map((obj) => {
                            return (
                              <div key={obj.id}>
                                <p>Q: {obj.question}</p>
                                <p>A: {obj.answer}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleClose}
                  >
                    Go back to cardDeck
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
