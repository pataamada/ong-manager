import { getDonations } from "@/services/finance.service"
import { z } from "zod"
import { actionClient } from "../safe-action"

const shema = z.object({
	limited: z.boolean().optional(),
})

export const getDonationAction = actionClient
	.schema(shema)
	.action(async ({ parsedInput: { limited } }) => {
		return await getDonations(limited)
	})
