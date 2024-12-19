import { incomesAndOutcomes } from "@/services/finance.service"
import { actionClient } from "../safe-action"

export const incomesAndOutcomesAction = actionClient.action(async () => {
	return await incomesAndOutcomes()
})
