import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"

export const getDonations = async () => {
	const q = query(collection(db, "donations"))
	const querySnapshot = await getDocs(q)
	const animals = querySnapshot.docs.map(doc => doc.data())
	return animals
}

export const getExpenses = async () => {
	const q = query(collection(db, "expenses"))
	const querySnapshot = await getDocs(q)
	const animals = querySnapshot.docs.map(doc => doc.data())
	return animals
}