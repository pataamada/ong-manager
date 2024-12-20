"use server"
import { z } from "zod"
import { actionClient } from "../safe-action"
import { auth } from "@/lib/firebase/firebase-secret"
import { sendPasswordResetEmail } from "firebase/auth"

const forgotPasswordSchema = z.object({
	email: z.string().email("Por favor, insira um e-mail válido"),
})

export const resetPassword = actionClient
	.schema(forgotPasswordSchema)
	.action(async ({ parsedInput: { email } }) => {
		await sendPasswordResetEmail(auth, email)
	})
