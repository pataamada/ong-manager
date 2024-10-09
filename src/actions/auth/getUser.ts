import { db } from "@/lib/firebase/firebase-admin"

export const getUser = async () => {
	try {
		const usersCollection = db.collection("users")
		const snapshot = await usersCollection.get()

		if (snapshot.empty) {
			console.log("Nenhum usuário encontrado.")
			return []
		}

		const usersList = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))

		console.log("Usuários requisitados com sucesso!")
		return usersList
	} catch (error) {
		console.error("Erro ao requisitar usuários: ", error)
		throw error
	}
}
