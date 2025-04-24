"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateSocial } from "@/services/social-media.service"
import type { Social } from "@/models/social.modal"

const schema = z.object({
  id: z.string(),
  type: z.string().optional(),
  content: z.string().optional()
})

export const updateSocialAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const { id, type, content } = parsedInput
    const payload: Partial<Social> & { id: string } = {
      id,
      type,
      content
    }
    const result = await updateSocial(payload)
    return result
  })