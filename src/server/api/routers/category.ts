import { undefined, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { categories } from "~/server/db/schema";
import { and, asc, eq } from "drizzle-orm";

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(255),
        description: z.string().min(3).max(4096),
        parentId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.parentId) {
        const parent = await ctx.db.query.categories.findFirst({
          where: eq(categories.id, input.parentId),
        });

        if (!parent) {
          throw new Error("Parent category not found");
        }
      }

      const sameNameAndParent = await ctx.db.query.categories.findFirst({
        where: and(
          eq(categories.name, input.name),
          eq(categories.parentId, input.parentId ?? 0),
        ),
      });

      if (sameNameAndParent) {
        throw new Error("Another subcategory is using this name");
      }

      const categoryTable = await ctx.db.insert(categories).values({
        createdAt: new Date(),
        description: input.description,
        name: input.name,
        parentId: input.parentId ?? 0,
        updatedAt: new Date(),
      });

      return categoryTable.insertId;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(3).max(255),
        description: z.string().min(3).max(4096),
        parentId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.parentId) {
        const parent = await ctx.db.query.categories.findFirst({
          where: eq(categories.id, input.parentId),
        });

        if (!parent) {
          throw new Error("Parent category not found");
        }
      }

      const sameNameAndParent = await ctx.db.query.categories.findFirst({
        where: and(
          eq(categories.name, input.name),
          eq(categories.parentId, input.parentId ?? 0),
          eq(categories.id, input.id),
        ),
      });

      if (sameNameAndParent) {
        throw new Error("Another subcategory is using this name");
      }

      await ctx.db
        .update(categories)
        .set({
          name: input.name,
          description: input.description,
          parentId: input.parentId ?? 0,
          updatedAt: new Date(),
        })
        .where(eq(categories.id, input.id));

      return input.id;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
    }),
  getSingle: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.categories.findFirst({
        where: eq(categories.id, input.id),
      });
    }),
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50),
        offset: z.number().min(0),
        name: z.string().optional(),
        parentId: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.categories.findMany({
        orderBy: asc(categories.name),
        limit: input.limit,
        offset: input.offset,
      });
    }),
});
