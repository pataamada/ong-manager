import {
	collection,
	query,
	getDocs,
	getDoc,
	doc,
	addDoc,
	updateDoc,
	serverTimestamp,
	deleteDoc,
} from "firebase/firestore"
import { db, storage } from "@/lib/firebase/firebase-secret"
import { PaymentService } from "@/services/Asaas/payment.service"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"

export const saveDonationDb = async (
	userId: string | undefined,
	animalId: string | undefined,
	category: string,
	value: number,
	description: string,
	date: string,
) => {
  const donationData: IPaymentCreateBoletoOrPix = {
    billingType: 'BOLETO',
    value: value,
    customer: userId,
    dueDate: date,
  }

  const createdDonation = await PaymentService.createPayment(donationData)

  const document = await addDoc(collection(db, "donations"), {
    userId: userId,
    animalId: animalId,
    category: category,
    value: value,
    description: description,
    date: date,
    donation: createdDonation,
  })
  return JSON.stringify(document)
}

export const saveExpenseDb = async (
	userId: string,
	category: string,
	value: number,
	proof: string[],
	description: string,
	date: string,
) => {
  const expenseData: IPaymentCreateBoletoOrPix = {
    billingType: 'BOLETO',
    value: value,
    customer: userId,
    dueDate: date,
  }

  const createExpense = await PaymentService.createPayment(expenseData)

  const document = await addDoc(collection(db, "expenses"), {
    userId: userId,
    category: category,
    value: value,
    description: description,
    proof: proof,
    date: date,
    expense: createExpense,
  })
  return JSON.stringify(document)
}
