"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { deleteNews } from "@/services/news.service"

const schema = z.object({
	id: z.string(),
})

export const deleteNewsAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { id } }) => {
		return await deleteNews(id)
	})
