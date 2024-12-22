import { updateEvent } from "@/services/event.service"
import { z } from "zod"
import { zfd } from "zod-form-data"
import { actionClient } from "../safe-action"

const fileSchema = zfd.formData({
	image: zfd.file().optional(),
})
const eventSchema = z.object({
	id: z.string(),
	title: z.string().optional(),
	date: z.string().optional(),
	description: z.string().optional(),
	images: z.instanceof(Array<File>).optional(),
	updatedBy: z.string().optional(),
})

export const updateEventAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([eventSchema])
	.action(async ({ parsedInput: { image }, bindArgsParsedInputs: [rest] }) => {
		const updatedEvent = await updateEvent({ image, ...rest })
		return JSON.stringify(updatedEvent)
	})
