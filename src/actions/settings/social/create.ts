"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { createSocial, findAll, updateSocial } from "@/services/social-media.service"
import type { SocialCreatePayload } from "@/models/social.modal"

const schema = z.object({
  type: z.string(),
  content: z.string(),
})

export const createSocialAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const { type, content } = parsedInput
    const payload: SocialCreatePayload = {
      type,
      content
    }
    const socials = await findAll()
    const existsItem = socials.find(s => s.type === type)
    if (existsItem) {
      await updateSocial({ id: existsItem.id, type, content })
      return
    }
    const result = await createSocial(payload)
    return JSON.stringify(result)
  })