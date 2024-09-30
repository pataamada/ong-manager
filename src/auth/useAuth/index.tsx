import { app, auth } from "@/lib/firebase/firebase-secret"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { setCookie } from "cookies-next"
import { findOne } from "@/services/user.service"
import { getAuth } from "firebase-admin/auth"
type LoginPayload = {
	email: string
	password: string
}
export async function login(data: LoginPayload) {
	try {
		const { user } = await signInWithEmailAndPassword(auth, data.email, data.password)


		if (app.name) {
			console.log(JSON.stringify(user))
			setCookie(app.name, JSON.stringify(user))
		}
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
		}
		console.log(error, "erro né")
	}
}

export async function signInTest(data: LoginPayload) {
	try {
		const { user } = await signInWithEmailAndPassword(auth, data.email, data.password)
		const idToken = await user.getIdToken()
		const userDb = await findOne(user.uid)
		console.log(userDb)
		
		const userId = user.uid
		const additionalClaims = {
			role: true,
		};
		const testAuth = getAuth()
		const token = await testAuth.createCustomToken(userId, additionalClaims)
		console.log(token);
		

		const response = await fetch("/api/auth/sign-in", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ idToken }),
		})
		const body = await response.json()
		if (response.ok && body.success) {
			return true
		}
		return false
	} catch (error) {
		console.error("Error signing in with Google", error)
		return false
	}
}
