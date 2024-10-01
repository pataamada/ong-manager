import { db } from "@/lib/firebase/firebase-secret"
import { collection, doc, type DocumentData, getDoc, getDocs, query, where } from "firebase/firestore"

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
	const doc = querySnapshot.docs.map(doc => {
		return { id: doc.id, data: doc.data() }
	})
	return doc[0] as
		| {
				id: string
				data: DocumentData
		  }
		| undefined
}
