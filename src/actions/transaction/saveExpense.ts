"use server"
import { actionClient } from "@/actions/safe-action"
import { ETransactionType, type IExpense } from "@/models/transaction.model"
import { handleSaveTransaction } from "@/services/finance.service"
import { z } from "zod"

const schema = z.object({
	transactionType: z.nativeEnum(ETransactionType),
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
