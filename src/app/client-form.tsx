"use client";

import * as React from "react";
import { Session } from "next-auth";
import { createPost } from "./actions";
import { useAction } from "~/trpc/client";
import { Button } from "~/ui/button";

export function ClientPostForm(props: { session: Session | null }) {
  const action = useAction(createPost);
  const [text, setText] = React.useState("");

  return (
    <form className="flex flex-col gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Title"
        className="w-full rounded bg-primary p-2 text-background"
      />
      <Button
        onClick={async () => {
          await action.mutateAsync({ text });
          setText("");
        }}
        disabled={!props.session}
      >
        {props.session?.user ? "Submit with hook" : "Sign in to post"}
      </Button>
    </form>
  );
}
