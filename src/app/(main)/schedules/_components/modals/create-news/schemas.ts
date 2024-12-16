import * as z from "zod"

export const newsSchema = z.object({
	title: z.string().min(6, "Mínimo de 6 caracteres"),
	tags: z.string().array(),
	description: z.string().min(6, "Mínimo de 6 caracteres"),
	photo: z.instanceof(File, { message: "Imagem é obrigatória" }),
})
export const updateNewsSchema = z.object({
	title: z.string().min(6, "Mínimo de 6 caracteres").optional(),
	tags: z.string().array().optional(),
	description: z.string().min(6, "Mínimo de 6 caracteres").optional(),
	photo: z.union(
		[
			z
				.instanceof(File, { message: "Imagem é obrigatória" })
				.refine(file => file.size < 2 * 1024 * 1024, "File size must be less than 2MB")
				.optional(),
			z.string().optional(),
		],
		{
			message: "Imagem é obrigatória",
		},
	),
})

export type NewsFormValues = z.infer<typeof newsSchema>
export type UpdateNewsSchema = z.infer<typeof updateNewsSchema>
