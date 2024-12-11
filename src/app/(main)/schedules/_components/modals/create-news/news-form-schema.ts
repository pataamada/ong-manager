import * as z from "zod"

export const newsSchema = z.object({
	title: z.string().min(1, "Título é obrigatório"),
	date: z.string().min(1, "Data é obrigatória"),
	description: z.string().optional(),
	image: z.string().optional(),
})

export type NewsFormValues = z.infer<typeof newsSchema>
