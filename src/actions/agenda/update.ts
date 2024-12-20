import { z } from "zod"
import { actionClient } from "../safe-action"
import { updateEvent } from "@/services/event.service"
import { zfd } from "zod-form-data"

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
		return await updateEvent({ image, ...rest })
	})
