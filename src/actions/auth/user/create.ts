"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { auth as authAdmin } from "@/lib/firebase/firebase-admin"
import { createUser as createUserService, existsCpf } from "@/services/user.service"
import { revalidatePath } from "next/cache"
import { UserRoles } from "@/models/user.model"

const userSchema = z.object({
	name: z.string().trim().min(4).max(255),
	email: z.string().trim().email(),
	password: z.string().trim().min(8).max(100),
	cpf: z.string().trim().length(11),
})

export const createUser = actionClient
	.schema(userSchema)
	.action(async ({ parsedInput: { name, cpf, email, password } }) => {
		if (await existsCpf(cpf)) {
			throw new Error("CPF já cadastrado")
		}
		const user = await authAdmin.createUser({
			displayName: name,
			email,
			password,
		})
		if (!user) {
			throw new Error("Erro ao criar o usuário")
		}
		await authAdmin.setCustomUserClaims(user.uid, { role: UserRoles.Authenticated })
		await createUserService(user.uid, { cpf })
		revalidatePath('/users')
		return user
	})
