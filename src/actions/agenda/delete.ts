import { deleteEvent } from "@/services/event.service"
import { actionClient } from "../safe-action"
import { z } from "zod"

const idSchema = z.object({
	id: z.string(),
})

export const deleteEventAction = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput: { id } }) => {
		await deleteEvent(id)
	})
