import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { createRouter } from "@/server/createRouter";
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

export const documentRouter = createRouter()
  .mutation("add", {
    input: DocumentModel,
    async resolve({ input }) {
      const document = await prisma.document.create({
        data: input,
        select: defaultDocumentSelect,
      });

      return document;
    },
  })
  .query("all", {
    async resolve() {
      return prisma.document.findMany({
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
