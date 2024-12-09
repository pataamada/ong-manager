import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import { PaymentService } from "@/services/Asaas/payment.service"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"
import type { IClientCreate } from "@/types/Asaas/Customer"
import { CustomerService } from "@/services/Asaas/customer.service"

export const handleExpenseCreation = async (
	userId: string,
	userCpfCnpj: string,
	category: string,
	value: number,
	proof: string[],
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
	proof: string[],
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
