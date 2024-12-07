import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import { PaymentService } from "@/services/Asaas/payment.service"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"
import type { IClientCreate } from "@/types/Asaas/Customer"
import { CustomerService } from "@/services/Asaas/customer.service"

export const saveDonationDb = async (
	userId: string | undefined,
	animalId: string | undefined,
	category: string,
	value: number,
	description: string,
	date: string,
) => {
	const donationData: IPaymentCreateBoletoOrPix = {
		billingType: "BOLETO",
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

export const handleExpenseCreation = async (
	userId: string,
	userName: string,
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

	let customerId: string

	if (customer.data[0]) {
		customerId = customer.data[0].id
	} else {
		const customerData: IClientCreate = {
			name: userName,
			cpfCnpj: userCpfCnpj,
		}
		const createdCustomer = await CustomerService.create(customerData)
		if (createdCustomer instanceof Error) {
			alert("Erro ao criar cliente")
			console.log(createdCustomer)
			return
		}
		customerId = createdCustomer.id

		return await saveExpenseDb(value, customerId, date, userId, category, description, proof)
	}
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
