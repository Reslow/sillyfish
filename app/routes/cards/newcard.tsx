import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createCard } from "~/models/card.server";
import { requireUserId } from "~/session.server";

type ActionData = {
  errors?: {
    question?: string;
    answer?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const question = formData.get("question");
  const answer = formData.get("answer");

  if (typeof question !== "string" || question.length === 0) {
    return json<ActionData>(
      { errors: { question: "question is required" } },
      { status: 400 }
    );
  } else if (typeof answer !== "string" || answer.length === 0) {
    return json<ActionData>(
      { errors: { question: "answer is required" } },
      { status: 400 }
    );
  }

  const card = await createCard({ question, answer, userId });

  return redirect(`/cards/${card.id}`);
};

export default function NewCardPage() {
  const actionData = useActionData() as ActionData;
  const nameRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.question) {
      nameRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Question</span>
          <input
            ref={nameRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.question ? true : undefined}
            aria-errormessage={
              actionData?.errors?.question ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.question && (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.question}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
