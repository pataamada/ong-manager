"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { saveAnimal } from "@/services/animal.service"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photos: z.array(zfd.file()),
})

const schema = z.object({
	name: z.string(),
	age: z.number(),
	type: z.nativeEnum(AnimalType),
	sex: z.nativeEnum(AnimalSex),
	observations: z.string(),
	avaliable: z.boolean(),
	castration: z.boolean(),
	updatedBy: z.string(),
})

export const saveAnimalAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photos }, bindArgsParsedInputs: [rest] }) => {
		const createdAnimal = await saveAnimal({ photos, ...rest })
		return JSON.stringify(createdAnimal)
	})
