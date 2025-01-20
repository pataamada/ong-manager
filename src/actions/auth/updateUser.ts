import { db } from "@/lib/firebase/firebase-admin"
import type { User } from "@/models/user.model"

export const updateUser = async (userId: string, updatedData: Partial<User>) => {
	try {
		await db.collection("users").doc(userId).update(updatedData)
		console.log("Usuário atualizado com sucesso!")
	} catch (error) {
		console.error("Erro ao atualizar usuário: ", error)
	}
}
