import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import type { IDonation } from "@/models/donation.model"
import type { IExpense } from "@/models/expense.model"

export const handleSaveTransaction = async (Transaction: IExpense | IDonation) => {
	const document = await addDoc(collection(db, "transactions"), Transaction)
	return JSON.stringify(document)
}

export const getAllTransactions = async () => {
	try {
		const transactionSnapshot = await getDocs(collection(db, "transactions"))
		return transactionSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))
	} catch (error) {
		console.error("Erro ao buscar todas as transações:", error)
		throw new Error("Erro ao buscar transações.")
	}
}

export const getOnlyDonations = async () => {
	try {
		const donationsQuery = query(
			collection(db, "transactions"),
			where("transactionType", "==", "donation"),
		)
		const donationsSnapshot = await getDocs(donationsQuery)
		return donationsSnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}))
	} catch (error) {
		console.error("Erro ao buscar doações:", error)
		throw new Error("Erro ao buscar doações.")
	}
}

export const getOnlyExpenses = async () => {
	try {
		const expensesQuery = query(
			collection(db, "transactions"),
			where("transactionType", "==", "expense"),
		)
		const expensesSnapshot = await getDocs(expensesQuery)
		return expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
	} catch (error) {
		console.error("Erro ao buscar despesas:", error)
		throw new Error("Erro ao buscar despesas.")
	}
}
