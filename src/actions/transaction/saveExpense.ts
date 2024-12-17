"use server"
import { z } from "zod"
import { serverTimestamp } from "firebase/firestore"
import { actionClient } from "@/actions/safe-action"
import { handleSaveTransaction } from "@/services/transaction.service"
import type { IExpense } from "@/models/transaction.model"
import { Category } from "@/models/transaction.model"

const schema = z.object({
  transactionType: z.literal("expense"),
	userId: z.string(),
	category: z.nativeEnum(Category),
	value: z.number(),
	description: z.string(),
	proof: z.array(z.string()),
})

export const saveExpenseAction = actionClient
	.schema(schema)
	.action(
    async ({ 
      parsedInput: {
        transactionType,
        userId,
        category, 
        value, 
        description, 
        proof,
      } 
    }) => {
      const expenseObject: IExpense = {
        transactionType,
        userId,
        category,
        value,
        description,
        proof,
        date: serverTimestamp(),
      }
      const savedExpense = await handleSaveTransaction(expenseObject)
		return JSON.stringify(savedExpense)
	})
