import { db } from "@/lib/firebase/firebase-admin"
import type { User } from "@/types/user"

export const createUser = async (userData: User) => {
	try {
		await db.collection("users").add(userData)
		console.log("Usuário criado com sucesso!")
	} catch (error) {
		console.error("Erro ao criar usuário: ", error)
	}
}
