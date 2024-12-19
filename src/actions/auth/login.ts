"use server"
import { actionClient } from "@/actions/safe-action"
import { auth } from "@/lib/firebase/firebase-cred"
import { UserRoles } from "@/models/user.model"
import { signInWithEmailAndPassword } from "firebase/auth"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

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
		revalidatePath(tokenData.claims.role === UserRoles.Admin ? "/dashboard" : "/animals", "layout")
		return {
			role: tokenData.claims.role,
		}
	})
