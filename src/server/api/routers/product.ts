import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { products } from "~/server/db/schema";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      await ctx.db.insert(products).values({
        name: input.name,
        description: "",
        createdById: ctx.session.user.id,
      });
    }),
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1),
        offset: z.number().min(0),
        orderBy: z.enum(["name", "createdAt", "price"]).optional(),
        order: z.enum(["asc", "desc"]).optional(),
        name: z.string().optional(),
        categories: z.array(z.string()).optional(),
        minPrice: z.number().min(0).optional(),
        maxPrice: z.number().min(0).optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.products.findMany({
        orderBy: input.orderBy
          ? (products, { desc, asc }) => [
              input.order === "desc"
                ? desc(products[input.orderBy as keyof typeof products])
                : asc(products[input.orderBy as keyof typeof products]),
            ]
          : undefined,
        limit: input.limit,
        offset: input.offset,
        with: {
          categories: true,
        },
      });
    }),
});
