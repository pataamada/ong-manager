"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import {  updateSettings } from "@/services/settings.service"

const schema = z.object({
  id: z.string(),
  adoption: z.object({
    method: z.enum(["whatsapp", "instagram"]),
    whatsapp: z.string().optional(),
    instagram: z.string().optional()
  }).optional(),
  paymentMethod: z.object({
    isUsingAsaas: z.boolean().optional(),
    qrCode: z.string().nullable().optional()
  }).optional()
})

export const updateSettingsAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const { id, ...rest } = parsedInput
    const result = await updateSettings({ id, ...rest })
    return JSON.stringify(result)
  })