"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveExpenseDb } from "@/services/transaction.service"

const schema = z.object({
	userId: z.string(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
	proof: z.array(z.string()),
	date: z.string(),
})

export const saveExpenseAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { userId, category, value, description, proof, date } }) => {
		const createdExpense = await saveExpenseDb(userId, category, value, proof, description, date)
		return JSON.stringify(createdExpense)
	})
