"use server"
import { actionClient } from "@/actions/safe-action"
import { findNews } from "@/services/news.service"

export const findNewsAction = actionClient.action(async () => {
	const news = await findNews()
	return JSON.stringify(news)
})
