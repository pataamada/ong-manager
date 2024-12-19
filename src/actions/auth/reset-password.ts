"use server"
import { auth } from "@/lib/firebase/firebase-cred"
import { sendPasswordResetEmail } from "firebase/auth"
import { z } from "zod"
import { actionClient } from "../safe-action"

const forgotPasswordSchema = z.object({
	email: z.string().email("Por favor, insira um e-mail válido"),
})

export const resetPassword = actionClient
	.schema(forgotPasswordSchema)
	.action(async ({ parsedInput: { email } }) => {
		await sendPasswordResetEmail(auth, email)
	})
