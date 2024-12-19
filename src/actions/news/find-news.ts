"use server"
import { actionClient } from "@/actions/safe-action"
import { findNews } from "@/services/news.service"
import z from "zod"

const schema = z.boolean()

export const findNewsAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
	const news = await findNews(parsedInput)
	return JSON.stringify(news)
})
