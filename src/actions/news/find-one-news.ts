"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { findOneNews } from "@/services/news.service"

const schema = z.object({
	id: z.string(),
})

export const findOneNewsAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { id } }) => {
		const news = await findOneNews(id)
		return JSON.stringify(news)
	})
