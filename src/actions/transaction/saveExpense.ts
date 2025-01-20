"use server"
import { actionClient } from "@/actions/safe-action"
import { ETransactionTypeExpense, type IExpense } from "@/models/expense.model"
import { handleSaveTransaction } from "@/services/finance.service"
import { z } from "zod"

const schema = z.object({
	transactionType: z.nativeEnum(ETransactionTypeExpense),
	category: z.string(),
	value: z.number(),
	description: z.string(),
})

export const saveExpenseAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { transactionType, category, value, description } }) => {
		const expenseObject: IExpense = {
			transactionType,
			category,
			value,
			description,
			date: new Date().toISOString(),
		}
		const savedExpense = await handleSaveTransaction(expenseObject)
		return JSON.parse(savedExpense)
	})
