"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveNews } from "@/services/news.service"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photo: zfd.file(),
})
const schema = z.object({
	title: z.string(),
	description: z.string(),
	updatedBy: z.string(),
	tags: z.string().array(),
})

export const saveNewsAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photo }, bindArgsParsedInputs: [rest] }) => {
		const createdNews = await saveNews({ photo, ...rest })
		return createdNews
	})
