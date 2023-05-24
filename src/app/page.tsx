import Image from "next/image";
import { createPost } from "~/app/actions";
import { Button } from "~/ui/button";
import { getServerSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
// import { ClientPostForm } from "./client-form";

export default async function Home() {
  const session = await getServerSession();
  const latestPost = session?.user
    ? await api.post.currentUserLatest.query()
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b from-muted to-background pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-indigo-700 before:to-transparent before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-900 after:via-fuchsia-600 after:opacity-40 after:blur-2xl after:content-[''] before:dark:to-fuchsia-400 before:lg:h-[360px]">
        <Image
          className="relative h-44 w-44 text-foreground"
          src="/t3-logo.svg"
          alt="T3 Logo"
          width={176}
          height={176}
          priority
        />
      </div>

      <div className="w-full max-w-xs">
        <h1 className="text-xl font-bold">
          Welcome to your T3 app {session?.user?.name}
        </h1>
        {session?.user ? (
          latestPost ? (
            <p className="truncate">Your most recent post: {latestPost.text}</p>
          ) : (
            <p>You have no posts yet.</p>
          )
        ) : (
          <p>
            You are not signed in.{" "}
            <Link className="underline" href="/api/auth/signin">
              Sign in
            </Link>
          </p>
        )}
        {/* <div className="flex gap-4"> */}
        <form action={createPost} className="flex flex-col gap-2">
          <input
            type="text"
            name="text"
            placeholder="Title"
            className="w-full rounded bg-primary p-2 text-background"
          />
          <Button type="submit" disabled={!session?.user}>
            {session?.user ? "Submit with form action" : "Sign in to post"}
          </Button>
        </form>

        {/* <ClientPostForm session={session} /> */}
        {/* </div> */}
      </div>
    </main>
  );
}
