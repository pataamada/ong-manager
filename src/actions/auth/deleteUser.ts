import { db } from "@/lib/firebase/firebase-admin"

export const deleteUser = async (userId: string) => {
	try {
		await db.collection("users").doc(userId).delete()
		console.log("Usuário apagado com sucesso!")
	} catch (error) {
		console.error("Erro ao apagar usuário: ", error)
	}
}
