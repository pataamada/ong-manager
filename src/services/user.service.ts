import { db } from "@/lib/firebase/firebase-secret"
import {
	collection,
	getDocs,
	doc,
	getDoc,
	query,
	where,
	type DocumentData,
} from "firebase/firestore"

export const getAllUsers = async () => {
	try {
		const usersCollection = collection(db, "users")
		const snapshot = await getDocs(usersCollection)

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

export const findOne = async (id: string) => {
	const document = await getDoc(doc(db, `users/${id}`))
	return document.data()
}

export const findUserByEmailPassword = async (email: string, password: string) => {
	const q = query(
		collection(db, "users"),
		where("email", "==", email),
		where("password", "==", password),
	)
	const querySnapshot = await getDocs(q)
	const doc = querySnapshot.docs.map(doc => ({
		id: doc.id,
		data: doc.data(),
	}))
	return doc[0] as
		| {
				id: string
				data: DocumentData
		  }
		| undefined
}
