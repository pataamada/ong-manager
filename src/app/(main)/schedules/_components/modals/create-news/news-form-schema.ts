import * as z from "zod"

export const newsSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	categories: z.string().array().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
})

export type NewsFormValues = z.infer<typeof newsSchema>
