"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { handleDonationCreation } from "@/services/donation.service"

const schema = z.object({
  userName: z.string().optional(),
  userCpf: z.string(),
	animalId: z.string().optional(),
	category: z.string(),
	value: z.number(),
	description: z.string(),
  proof: z.array(z.string()), 
	date: z.string(),
})

export const saveDonationAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { userName, userCpf, animalId, category, value, description, proof, date } }) => {
		const createdDonation = await handleDonationCreation(
      animalId,
      userName,
      userCpf,
      category,
      value,
      description,
      proof,
      date,
		)
		return JSON.stringify(createdDonation)
	})
