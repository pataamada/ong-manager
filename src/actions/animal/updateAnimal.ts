"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateAnimal } from "@/services/animal.service"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import type { FieldValue } from "firebase/firestore"

const schema = z.object({
	id: z.string(),
	name: z.string(),
	age: z.number(),
	type: z.nativeEnum(AnimalType),
	sex: z.nativeEnum(AnimalSex),
	observations: z.string(),
	avaliable: z.boolean(),
	castration: z.boolean(),
	photos: z.instanceof(Array<File>),
	createdAt: z.custom<FieldValue>(),
	updatedAt: z.custom<FieldValue>(),
	updatedBy: z.string(),
})

export const updateAnimalAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
	const updateDocument = await updateAnimal(parsedInput)
	return JSON.stringify(updateDocument)
})
