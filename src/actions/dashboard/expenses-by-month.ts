import { expensesByMonth } from "@/services/finance.service"
import { actionClient } from "../safe-action"

export const expensesByMonthAction = actionClient.action(async () => {
	return await expensesByMonth()
})
