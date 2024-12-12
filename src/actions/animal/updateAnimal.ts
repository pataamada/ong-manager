"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateAnimal } from "@/services/animal.service"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photos: z.array(zfd.file()),
})

const schema = z.object({
	id: z.string(),
	name: z.string(),
	age: z.number(),
	type: z.nativeEnum(AnimalType),
	sex: z.nativeEnum(AnimalSex),
	observations: z.string(),
	avaliable: z.boolean(),
	castration: z.boolean(),
	updatedBy: z.string(),
})

export const updateAnimalAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photos }, bindArgsParsedInputs: [rest] }) => {
		const updateDocument = await updateAnimal({
			photos,
			...rest,
		})
		return JSON.stringify(updateDocument)
	})
