"use server"

import { custom, z } from "zod"
import { actionClient } from "@/actions/safe-action"
import { signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase/firebase-secret"
import { createSessionCookie, firebaseApp } from "@/lib/firebase/firebase-admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { findUserByLogin } from "@/services/user.service"
import { getAuth } from "firebase-admin/auth"

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
})

export const login = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { email, password } }) => {
		const userDb = await findUserByLogin(email, password)
		console.log(userDb)
		const userId = userDb.id

		const additionalClaims = {
			role: userDb?.data.role || "AUTHENTICATED",
		}
		const customToken = await getAuth(firebaseApp).createCustomToken(userId, additionalClaims)
		const token = await signInWithCustomToken(auth, customToken)
		const tokenId = await token.user.getIdToken()
		const expiresIn = 5 * 60 * 60 * 1000 // 1 hour
		const sessionCookie = await createSessionCookie(tokenId, { expiresIn })
		cookies().set("__session", sessionCookie, {
			maxAge: expiresIn,
			httpOnly: true,
			secure: true,
		})
		redirect("/dashboard")
	})
