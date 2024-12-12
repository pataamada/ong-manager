"use server"
import { z } from "zod"
import { actionClient } from "../safe-action"
import { createEvent, deleteEvent, findAllEvents, updateEvent } from "@/services/event.service"
import { revalidatePath } from "next/cache"

const eventSchema = z.object({
	id: z.string(),
	title: z.string(),
	date: z.string(),
	description: z.string(),
	images: z.instanceof(Array<File>),
	updatedBy: z.string(),
})

const createSchema = eventSchema.omit({ id: true })

const idSchema = z.object({
	id: z.string(),
})

export const createEventAction = actionClient
	.schema(createSchema)
	.action(async ({ parsedInput }) => {
		await createEvent(parsedInput)
		revalidatePath("/schedules")
	})

export const findAllEventsAction = actionClient.action(async () => {
	return await findAllEvents()
})

export const updateEventAction = actionClient
	.schema(eventSchema)
	.action(async ({ parsedInput }) => {
		await updateEvent(parsedInput)
	})

export const deleteEventAction = actionClient
	.schema(idSchema)
	.action(async ({ parsedInput: { id } }) => {
		await deleteEvent(id)
		revalidatePath("/schedules")
	})
