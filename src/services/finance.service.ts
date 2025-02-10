import { db } from "@/lib/firebase/firebase-secret"
import type { IDonation } from "@/models/donation.model"
import type { IExpense } from "@/models/expense.model"
import { format, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"

export interface Expense {
	id: string
	value: number
	customerId: string
	date: string
	userId: string
	category: string
	description: string
	proof: File[]
}

export interface Donation {
	id: string
	animalId: string | undefined
	userName: string | undefined
	userCpfCnpj: string
	category: string
	value: number
	description: string
	proof: string[]
	date: string
}

export const getDonations = async (limited?: boolean) => {
	let q = query(collection(db, "donations"), orderBy("date", "desc"))
	if (limited) q = query(collection(db, "donations"), limit(20), orderBy("date", "desc"))
	const querySnapshot = await getDocs(q)
	const donations = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}))
	return donations as Donation[]
}

export const getExpenses = async (limited?: boolean) => {
	let q = query(collection(db, "expenses"), orderBy("date", "desc"))
	if (limited) q = query(collection(db, "expenses"), limit(20), orderBy("date", "desc"))
	const querySnapshot = await getDocs(q)
	const expenses = querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	}))
	return expenses as Expense[]
}

export const handleSaveTransaction = async (transaction: IExpense | IDonation) => {
	const collectionName = transaction.transactionType === "donation" ? "donations" : "expenses"
	const document = await addDoc(collection(db, collectionName), transaction)
	return JSON.stringify(document)
}

export const expensesByMonth = async (month?: number, year?: number) => {
	month = month === undefined ? new Date().getMonth() : month - 1
	year = year === undefined ? new Date().getFullYear() : year
	const firstDay = new Date(year, month, 1).toISOString()
	const lastDay = new Date(year, month + 1, 0).toISOString()

	const querySnapshotExpenses = await getDocs(
		query(
			collection(db, "expenses"),
			where("date", ">=", firstDay),
			where("date", "<=", lastDay),
			orderBy("date"),
		),
	)
	const querySnapshotDonations = await getDocs(
		query(
			collection(db, "donations"),
			where("date", ">=", firstDay),
			where("date", "<=", lastDay),
			orderBy("date"),
		),
	)
	const expenses = querySnapshotExpenses.docs.map(doc => doc.data()) as Expense[]
	const donations = querySnapshotDonations.docs.map(doc => doc.data()) as Donation[]

	const totalExpenses = expenses.reduce((acc, curr) => {
		return acc + curr.value
	}, 0)
	const totalDonations = donations.reduce((acc, curr) => {
		return acc + curr.value
	}, 0)

	return {
		totalExpenses,
		totalDonations,
	}
}

export const incomesAndOutcomes = async () => {
	const balance = []

	for (let index = 5; index >= 0; index--) {
		const sixMonthsAgo = subMonths(new Date(), index)
		const balanceByMonth = await expensesByMonth(
			sixMonthsAgo.getMonth() + 1,
			sixMonthsAgo.getFullYear(),
		)
		balance.push({
			month: format(sixMonthsAgo, "MMMM", { locale: ptBR }),
			...balanceByMonth,
		})
	}
	return balance
}

export const expensesByCategory = async () => {
	const querySnapshot = await getDocs(query(collection(db, "expenses")))
	const expenses = querySnapshot.docs.map(doc => doc.data()) as Expense[]

	const summary: { [key: string]: number } = {}

	function group({ category, value }: { category: string; value: number }) {
		if (Object.keys(summary).includes(category)) {
			return (summary[category] += value)
		}
		return (summary[category] = value)
	}
	expenses.map(ex => group({ category: ex.category, value: ex.value }))

	return summary
}
