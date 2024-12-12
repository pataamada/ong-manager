import { updateInfo } from "@/services/ong.service"
import { actionClient } from "../safe-action"
import { z } from "zod"

const OngParams = z.object({
	cnpj: z.string(),
	email: z.string(),
	facebook: z.string().optional(),
	instagram: z.string(),
	localizacao: z.string(),
	nome: z.string(),
	pontosDoacao: z.array(z.string()),
	telefone: z.string(),
})

export const updateInfoAction = actionClient.schema(OngParams).action(async ({ parsedInput }) => {
	return await updateInfo(parsedInput)
})
