"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { findAnimalById } from "@/services/animal.service"

const schema = z.object({
	animalId: z.string(),
})

export const findAnimalByIdAction = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { animalId } }) => {
		const animal = await findAnimalById(animalId)
		return JSON.stringify(animal)
	})
