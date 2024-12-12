"use server"
import { actionClient } from "@/actions/safe-action"
import { findRecentNews } from "@/services/news.service"

export const findRecentNewsAction = actionClient.action(async () => {
	const news = await findRecentNews()
	return JSON.stringify(news)
})
