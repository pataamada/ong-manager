import { db } from "@/lib/firebase/firebase-secret"
import { PaymentService } from "@/services/Asaas/payment.service"
import { addDoc, collection } from "firebase/firestore"
import { checkIfCustomerExists } from "./Asaas/customer.service"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"

export const handleExpenseCreation = async (
	userId: string,
	userCpfCnpj: string,
	category: string,
	value: number,
	proof: File[],
	description: string,
	date: string,
) => {
	const customer = await checkIfCustomerExists(userCpfCnpj)

	if (customer instanceof Error) {
		console.log("Erro ao buscar cliente", customer)
		return
	}

	const customerId = customer.data[0].id

	return await saveExpenseDb(value, customerId, date, userId, category, description, proof)
}

const saveExpenseDb = async (
	value: number,
	customerId: string,
	date: string,
	userId: string,
	category: string,
	description: string,
	proof: File[],
) => {
	const expenseData: IPaymentCreateBoletoOrPix = {
		billingType: "BOLETO",
		value: value,
		customer: customerId,
		dueDate: date,
	}
	const createdExpense = await PaymentService.createPayment(expenseData)
	if (createdExpense instanceof Error) {
		console.log("Erro ao criar despesa", createdExpense)
		return
	}

	const document = await addDoc(collection(db, "expenses"), {
		userId: userId,
		category: category,
		value: value,
		description: description,
		proof: proof,
		date: date,
		expense: createdExpense,
	})
	return JSON.stringify(document)
}
