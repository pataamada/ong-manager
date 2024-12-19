"use server"
import { actionClient } from "@/actions/safe-action"
import { expensesByCategory } from "@/services/finance.service"

export const expensesByCategoryAction = actionClient.action(async () => {
	return await expensesByCategory()
})
