import { db } from "@/lib/firebase/firebase-secret"
import { CustomerService } from "@/services/Asaas/customer.service"
import { PaymentService } from "@/services/Asaas/payment.service"
import type { IClientCreate } from "@/types/Asaas/Customer"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"
import { addDoc, collection } from "firebase/firestore"

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
		alert("Erro ao buscar cliente")
		console.log(customer)
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
		alert("Erro ao criar despesa")
		console.log(createdExpense)
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

const checkIfCustomerExists = (cpfCnpj: string) => {
	return CustomerService.getCustomerByCpfCnpj(cpfCnpj)
}
