"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveAnimal } from "@/services/animal.service"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import type { FieldValue } from "firebase/firestore"

const schema = z.object({
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

export const saveAnimalAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
	const createdAnimal = await saveAnimal(parsedInput)
	return JSON.stringify(createdAnimal)
})
