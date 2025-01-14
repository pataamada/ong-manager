"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { ESaveDonationMethod, ETransactionType, type IDonation } from "@/models/donation.model"
import { handleSaveTransaction } from "@/services/finance.service"

const schema = z.object({
	transactionType: z.nativeEnum(ETransactionType),
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
			const donationObject: IDonation = {
				transactionType,
        saveDonationMethod,
				animalId,
				userName,
				userCpfCnpj,
				category,
				value,
				description,
				date: new Date().toISOString(),
			}
			const savedDonation = await handleSaveTransaction(donationObject)
			return JSON.parse(savedDonation)
		},
	)
