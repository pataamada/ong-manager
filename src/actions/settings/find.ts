"use server"
import { actionClient } from "@/actions/safe-action"
import { getSettings } from "@/services/settings.service"

export const findSettingsAction = actionClient.action(async () => {
  const settings = await getSettings()
  return JSON.stringify(settings)
})