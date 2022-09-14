import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const DocumentModel = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullish(),
  userId: z.string(),
})

export interface CompleteDocument extends z.infer<typeof DocumentModel> {
  user: CompleteUser
}

/**
 * RelatedDocumentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDocumentModel: z.ZodSchema<CompleteDocument> = z.lazy(() => DocumentModel.extend({
  user: RelatedUserModel,
}))
