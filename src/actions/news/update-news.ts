"use server"
import { actionClient } from "@/actions/safe-action"
import { updateNews } from "@/services/news.service"
import type { Timestamp } from "firebase/firestore"
import { z } from "zod"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photo: zfd.file().optional(),
})

const schema = z.object({
	id: z.string(),
	title: z.string().optional(),
	tags: z.array(z.string()).optional(),
	description: z.string().optional(),
	createdAt: z.custom<Timestamp>().optional(),
	updatedAt: z.custom<Timestamp>().optional(),
	updatedBy: z.string().optional(),
})

export const updateNewsAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photo }, bindArgsParsedInputs: [rest] }) => {
		const updatedNews = await updateNews({ photo, ...rest })
		return JSON.stringify(updatedNews)
	})
