import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"

export const getDonations = async () => {
	const q = query(collection(db, "donations"))
	const querySnapshot = await getDocs(q)
	const donations = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
	return JSON.stringify(donations)
}

export const getExpenses = async () => {
	const q = query(collection(db, "expenses"))
	const querySnapshot = await getDocs(q)
	const expenses = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
	return JSON.stringify(expenses)
}