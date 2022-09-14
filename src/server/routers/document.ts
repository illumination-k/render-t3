import { createRouter } from "@/server/createRouter";
import { prisma } from "@/server/prisma";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.DocumentSelect>()({
  id: true,
  title: true,
  content: true,
});
