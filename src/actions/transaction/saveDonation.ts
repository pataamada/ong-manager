"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveDonationDb } from "@/services/transaction.service"

const schema = z.object({
	userId: z.string().optional(),
	animalId: z.string().optional(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
	date: z.string(),
})

export const saveDonationAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { userId, animalId, category, value, description, date } }) => {
		const createdDonation = await saveDonationDb(
			userId,
			animalId,
			category,
			value,
			description,
			date,
		)
		return JSON.stringify(createdDonation)
	})
