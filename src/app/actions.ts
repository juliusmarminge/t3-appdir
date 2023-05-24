"use server";
import { createAction, publicProcedure } from "~/server/api/trpc";
import * as procs from "~/server/api/routers/post";
import * as z from "zod";

export const createPost = createAction(procs.createPost);

export const editPost = createAction(
  publicProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().min(1),
      })
    )
    .mutation((opts) => {
      return opts.ctx.db.post.update({
        where: {
          id: opts.input.id,
        },
        data: {
          text: opts.input.text,
        },
      });
    })
);
