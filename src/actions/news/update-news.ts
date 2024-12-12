"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateNews } from "@/services/news.service"
import type { Timestamp } from "firebase/firestore"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photo: zfd.file(),
})

const schema = z.object({
	id: z.string(),
	title: z.string(),
	tags: z.array(z.string()),
	description: z.string(),
	createdAt: z.custom<Timestamp>(),
	updatedAt: z.custom<Timestamp>(),
	updatedBy: z.string(),
})

export const updateNewsAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photo }, bindArgsParsedInputs: [rest] }) => {
		return await updateNews({ photo, ...rest })
	})
