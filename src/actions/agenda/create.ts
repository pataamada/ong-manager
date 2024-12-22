import { createEvent } from "@/services/event.service"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { actionClient } from "../safe-action"

const fileSchema = zfd.formData({
	image: zfd.file(),
})
const createSchema = z.object({
	title: z.string(),
	date: z.string(),
	description: z.string(),
	updatedBy: z.string(),
})
export const createEventAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([createSchema])
	.action(async ({ parsedInput: { image }, bindArgsParsedInputs: [rest] }) => {
		const createdNews = await createEvent({ image, ...rest })
		return JSON.stringify(createdNews)
	})
