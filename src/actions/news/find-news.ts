"use server"
import { actionClient } from "@/actions/safe-action"
import { findNews } from "@/services/news.service"

export const findNewsAction = actionClient.action(async () => {
	return await findNews()
})
