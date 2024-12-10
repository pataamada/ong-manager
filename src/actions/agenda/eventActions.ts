"use server"

import { z } from "zod"
import { actionClient } from "../safe-action"
import {
	deleteEventService,
	createEventService,
	updateEventService,
} from "@/services/event.service"
import { revalidatePath } from "next/cache"

const formSchema = z.object({
	id: z.string(),
	title: z.string(),
	date: z.string(),
	description: z.string().optional(),
	image: z.any().optional(),
})

const createFormSchema = formSchema.omit({ id: true })
const deleteFormSchema = formSchema.omit({
	title: true,
	date: true,
	description: true,
	image: true,
})

export const createEvent = actionClient
	.schema(createFormSchema)
	.action(async ({ parsedInput: { title, date, description, image } }) => {
		const data = { title, date, description, image }
		await createEventService(data)
		revalidatePath("/schedules")
	})

export const updateEvent = actionClient
	.schema(formSchema)
	.action(async ({ parsedInput: { id, title, date, description, image } }) => {
		const data = { title, date, description, image }
		await updateEventService(id, data)
	})

export const deleteEvent = actionClient
	.schema(deleteFormSchema)
	.action(async ({ parsedInput: { id } }) => {
		await deleteEventService(id)
		revalidatePath("/schedules")
	})
