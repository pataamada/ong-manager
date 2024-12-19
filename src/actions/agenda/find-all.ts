"use server"
import { actionClient } from "../safe-action"
import { findAllEvents } from "@/services/event.service"

export const findAllEventsAction = actionClient.action(async () => {
	return await findAllEvents()
})
