"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { findAll, findOne } from "@/services/social-media.service"

const findOneSchema = z.object({
  id: z.string()
})

export const findSocialByIdAction = actionClient
  .schema(findOneSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput
    const social = await findOne(id)
    return social
  })

export const findAllSocialsAction = actionClient
  .action(async () => {
    const socials = await findAll()
    return JSON.stringify(socials)
  })