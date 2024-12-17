import * as z from "zod"

export const eventSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	date: z.string().min(1, "Data é obrigatória"),
	description: z.string(),
	image: z.instanceof(File, { message: "Imagem é obrigatória" }),
})

export const updateEventSchema = z.object({
	title: z.string().min(6, "Mínimo de 6 caracteres").optional(),
	date: z.string().min(1, "Data é obrigatória").optional(),
	description: z.string().min(6, "Mínimo de 6 caracteres").optional(),
	image: z.union(
		[
			z
				.instanceof(File, { message: "Imagem é obrigatória" })
				.refine(file => file.size < 2 * 1024 * 1024, "O arquivo deve ter menos de 2MB")
				.optional(),
			z.string().optional(),
		],
		{
			message: "Imagem é obrigatória",
		},
	),
})


export type EventFormValues = z.infer<typeof eventSchema>
export type UpdateEventFormValues = z.infer<typeof updateEventSchema>
