"use server"
import { z } from "zod"
import { serverTimestamp } from "firebase/firestore"
import { actionClient } from "@/actions/safe-action"
import type { IDonation } from "@/models/transaction.model"
import { Category } from "@/models/transaction.model"
import { handleSaveTransaction } from "@/services/transaction.service"

const schema = z.object({
	transactionType: z.literal("donation"),
	userName: z.string().optional(),
	userCpfCnpj: z.string().optional(),
	animalId: z.string().optional(),
	category: z.nativeEnum(Category),
	value: z.number(),
	description: z.string(),
	proof: z.array(z.string()),
})

export const saveDonationAction = actionClient
	.schema(schema)
	.action(
		async ({
			parsedInput: {
				transactionType,
				userName,
				userCpfCnpj,
				animalId,
				category,
				value,
				description,
				proof,
			},
		}) => {
			const donationObject: IDonation = {
				transactionType,
				animalId,
				userName,
				userCpfCnpj,
				category,
				value,
				description,
				proof,
				date: serverTimestamp(),
			}
			const savedDonation = await handleSaveTransaction(donationObject)
			return JSON.stringify(savedDonation)
		},
	)
