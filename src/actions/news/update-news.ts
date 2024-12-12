"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateNews } from "@/services/news.service"
import type { FieldValue } from "firebase/firestore"

const schema = z.object({
	id: z.string(),
	photo: z.instanceof(File),
	title: z.string(),
	tags: z.array(z.string()),
	description: z.string(),
	updatedBy: z.string(),
	createdAt: z.custom<FieldValue>(),
	updatedAt: z.custom<FieldValue>(),
})

export const updateNewsAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
	return await updateNews(parsedInput)
})
