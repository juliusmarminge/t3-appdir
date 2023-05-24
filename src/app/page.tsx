import Image from "next/image";
import { createPost } from "~/app/actions";
import { Button } from "~/ui/button";
import { getServerSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerSession();
  const latestPost = await api.post.currentUserLatest.query();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b from-muted to-background pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border lg:p-4">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-foreground before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-indigo-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-fuchsia-600 after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/t3-logo.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div>
        <h1 className="text-xl font-bold">
          Welcome to your T3 app {session?.user?.name ?? "Anonymous"}
        </h1>
        {latestPost ? (
          <p>Your most recent post: {latestPost.text}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}

        <form action={createPost} className="flex flex-col gap-2">
          <input
            type="text"
            name="text"
            placeholder="Title"
            className="w-full rounded bg-primary p-2 text-background"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </main>
  );
}
