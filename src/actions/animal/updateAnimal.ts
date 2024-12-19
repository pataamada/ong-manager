"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { updateAnimal } from "@/services/animal.service"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import { zfd } from "zod-form-data"

const fileSchema = zfd.formData({
	photo: zfd.file().optional(),
})

const schema = z.object({
	id: z.string(),
	name: z.string().optional(),
	age: z.number().optional(),
	type: z.nativeEnum(AnimalType).optional(),
	sex: z.nativeEnum(AnimalSex).optional(),
	observations: z.string().optional(),
	avaliable: z.boolean().optional(),
	castration: z.boolean().optional(),
	updatedBy: z.string(),
})

export const updateAnimalAction = actionClient
	.schema(fileSchema)
	.bindArgsSchemas([schema])
	.action(async ({ parsedInput: { photo }, bindArgsParsedInputs: [rest] }) => {
		console.log(rest)
		const updateDocument = await updateAnimal({
			photo,
			...rest,
		})
		return JSON.stringify(updateDocument)
	})