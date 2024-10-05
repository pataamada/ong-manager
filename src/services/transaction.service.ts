import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import type { IDonation } from "@/models/transaction.model"
import type { IExpense } from "@/models/transaction.model"

export const handleSaveTransaction = async (Transaction: IExpense | IDonation) => {
	const document = await addDoc(collection(db, "transactions"), Transaction)
	return JSON.stringify(document)
}
