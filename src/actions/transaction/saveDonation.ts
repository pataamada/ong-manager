"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { ESaveDonationMethod, ETransactionTypeDonation } from "@/models/donation.model"
import { handleSaveTransaction } from "@/services/finance.service"

const schema = z.object({
	transactionType: z.nativeEnum(ETransactionTypeDonation),
	saveDonationMethod: z.nativeEnum(ESaveDonationMethod),
	userName: z.string().optional(),
	userCpfCnpj: z.string().optional(),
	animalId: z.string().optional(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
})

export const saveDonationAction = actionClient
	.schema(schema)
	.action(
		async ({
			parsedInput: {
				transactionType,
				saveDonationMethod,
				userName,
				userCpfCnpj,
				animalId,
				category,
				value,
				description,
			},
		}) => {
			const savedDonation = await handleSaveTransaction({
				transactionType,
				saveDonationMethod,
				animalId,
				userName,
				userCpfCnpj,
				category,
				value,
				description,
				date: new Date().toISOString(),
			})
			return JSON.parse(savedDonation)
		},
	)
