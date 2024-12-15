import * as z from "zod"

export const newsSchema = z.object({
	title: z.string().min(6, "Mínimo de 6 caracteres"),
	tags: z.string().array(),
	description: z.string().min(6, "Mínimo de 6 caracteres"),
	photo: z.instanceof(File, { message: "Imagem é obrigatória" }),
})

export type NewsFormValues = z.infer<typeof newsSchema>
