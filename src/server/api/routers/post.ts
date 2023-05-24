import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const createPost = protectedProcedure
  .input(z.object({ text: z.string().min(1) }))
  .mutation(async (opts) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return opts.ctx.db.post.create({
      data: {
        text: opts.input.text,
        createdBy: { connect: { id: opts.ctx.session.user.id } },
      },
    });
  });

export const postRouter = createTRPCRouter({
  currentUserLatest: protectedProcedure.query(async (opts) => {
    return opts.ctx.db.post.findFirst({
      where: { createdBy: { id: opts.ctx.session.user.id } },
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async (opts) => {
    const startTime = Date.now();
    const items = await opts.ctx.db.post.findMany({
      take: 10,
      orderBy: { updatedAt: "desc" },
      include: { createdBy: true },
    });
    const duration = Date.now() - startTime;

    return { items, duration, fetchedAt: new Date(startTime) };
  }),

  create: createPost,
});
