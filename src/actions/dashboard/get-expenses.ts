import { getExpenses } from "@/services/finance.service"
import { z } from "zod"
import { actionClient } from "../safe-action"

const shema = z.object({
	limited: z.boolean().optional(),
})

export const getExpensesAction = actionClient
	.schema(shema)
	.action(async ({ parsedInput: { limited } }) => {
		return await getExpenses(limited)
	})
