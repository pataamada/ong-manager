import { auth } from "@/lib/firebase/firebase-secret"
import type { User } from "@/models/user.model"
import { FirebaseError } from "firebase/app"
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth"

export async function login(userParam) {
	console.log(userParam)

	try {
		const { user } = await signInWithEmailAndPassword(auth, userParam.email, userParam.password)
		console.log(user)
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			
		}
		console.log(error, "erro né")
	}
}
