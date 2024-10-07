"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/firebase-secret"
import { createUser } from "@/services/user.service"

const schema = z.object({
	name: z.string().trim().min(4).max(255),
	email: z.string().trim().email(),
	password: z.string().trim().min(8).max(100),
	cpf: z.string().trim().length(11),
})

export const login = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { name, cpf, email, password } }) => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)
		console.log(user)
		const userId = user.uid

		const savedUser = await createUser(userId, { name, email, password, cpf })
		console.log(savedUser)
	})
