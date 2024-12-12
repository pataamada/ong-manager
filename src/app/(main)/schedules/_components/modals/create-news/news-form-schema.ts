import * as z from "zod"

export const newsSchema = z.object({
	title: z.string().min(6, "Título é obrigatório"),
	tags: z.string().array(),
	description: z.string(),
	photo: z.instanceof(File, { message: "Imagem é obrigatória" }),
})

export type NewsFormValues = z.infer<typeof newsSchema>
