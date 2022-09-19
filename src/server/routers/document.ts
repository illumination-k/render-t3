import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { createProtectedRouter } from "@/server/createRouter";
import { prisma } from "@/server/prisma";
import { DocumentModel } from "@/zod";
import { z } from "zod";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultDocumentSelect = Prisma.validator<Prisma.DocumentSelect>()({
  id: true,
  title: true,
  content: true,
});

export const documentRouter = createProtectedRouter()
  .mutation("add", {
    input: z.object({
      title: z.string(),
      content: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      // console.log(ctx);
      const doc = await prisma.document.create({
        data: {
          title: input.title,
          content: input.content,
          userId: ctx.session.userId,
        },
      });
      return doc;
    },
  })
  .query("list", {
    async resolve({ ctx }) {
      return prisma.document.findMany({
        where: { userId: ctx.session.userId },
        select: defaultDocumentSelect,
      });
    },
  })
  .query("retrive", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;

      const document = await prisma.document.findUnique({
        where: { id },
        select: defaultDocumentSelect,
      });

      if (!document) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No document with id '${id}'`,
        });
      }

      return document;
    },
  })
  .mutation("update", {
    input: DocumentModel,
    async resolve({ input }) {
      const { id, ...data } = input;
      const document = await prisma.document.update({
        where: { id },
        data,
        select: defaultDocumentSelect,
      });

      return document;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.document.delete({ where: { id } });
      return {
        id,
      };
    },
  });
