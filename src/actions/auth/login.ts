"use server"
import { z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/firebase-secret"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
})

export const login = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { email, password } }) => {
		const { user } = await signInWithEmailAndPassword(auth, email, password)
		const token = await user.getIdToken()
		const tokenData = await user.getIdTokenResult()
		const expiresIn = new Date(tokenData.expirationTime)
		cookies().set("__session", token, {
			expires: expiresIn,
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			priority: "high",
		})
		revalidatePath("/", "layout")
		return {
			role: tokenData.claims.role,
		}
	})
