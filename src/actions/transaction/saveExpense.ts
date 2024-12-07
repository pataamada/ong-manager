"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { handleExpenseCreation } from "@/services/transaction.service"

const schema = z.object({
	userId: z.string(),
  userName: z.string(),
  userCpf: z.string(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
	proof: z.array(z.string()),
	date: z.string(),
})

export const saveExpenseAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { userId, userName, userCpf, category, value, description, proof, date } }) => {
		const createdExpense = await handleExpenseCreation(userId, userName, userCpf, category, value, proof, description, date)
		return JSON.stringify(createdExpense)
	})
