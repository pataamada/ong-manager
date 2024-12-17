import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import { IDonation, IExpense } from "@/models/transaction.model"

export const getDonations = async () => {
	const q = query(collection(db, "donations"))
	const querySnapshot = await getDocs(q)
	const donations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	return JSON.stringify(donations)
}

export const getExpenses = async () => {
	const q = query(collection(db, "expenses"))
	const querySnapshot = await getDocs(q)
	const expenses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	return JSON.stringify(expenses)
}

export const handleSaveTransaction = async (transaction: IExpense | IDonation) => {
	const collectionName = transaction.transactionType === "donation" ? "donations" : "expenses"
	const document = await addDoc(collection(db, collectionName), transaction)
	return JSON.stringify(document)
}