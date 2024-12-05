"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { handleExpenseCreation } from "@/services/expense.service"

const schema = z.object({
	userId: z.string(),
  userCpfCnpj: z.string(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
	proof: z.array(z.string()),
	date: z.string(),
})

export const saveExpenseAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { userId, userCpfCnpj, category, value, description, proof, date } }) => {
		const createdExpense = await handleExpenseCreation(userId, userCpfCnpj, category, value, proof, description, date)
		return JSON.stringify(createdExpense)
	})
