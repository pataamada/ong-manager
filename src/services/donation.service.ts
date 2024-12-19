import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase-secret"
import { PaymentService } from "@/services/Asaas/payment.service"
import { checkIfCustomerExists } from "./Asaas/customer.service"
import type { IPaymentCreateBoletoOrPix } from "@/types/Asaas/Payment"

export const handleDonationCreation = async (
	animalId: string | undefined,
	userName: string | undefined,
	userCpfCnpj: string,
	category: string,
	value: number,
	description: string,
	proof: string[],
	date: string,
) => {
	const customer = await checkIfCustomerExists(userCpfCnpj)
	let customerId = ""

	if (customer instanceof Error) {
		customerId = ""
	} else {
		customerId = customer.data[0].id
	}

	return await saveDonationDb(
		userName,
		userCpfCnpj,
		animalId,
		customerId,
		category,
		value,
		description,
		proof,
		date,
	)
}

const saveDonationDb = async (
	userName: string | undefined,
	userCpf: string | undefined,
	animalId: string | undefined,
	customerId: string,
	category: string,
	value: number,
	description: string,
	proof: string[],
	date: string,
) => {
	const donationData: IPaymentCreateBoletoOrPix = {
		billingType: "BOLETO",
		value: value,
		customer: customerId,
		dueDate: date,
	}
	const createdDonation = await PaymentService.createPayment(donationData)
	if (createdDonation instanceof Error) {
		console.log(createdDonation, "PaymentService.createPayment")
		return
	}

	const document = await addDoc(collection(db, "donations"), {
		userName: userName,
		userCpf: userCpf,
		animalId: animalId,
		category: category,
		value: value,
		description: description,
		proof: proof,
		date: date,
		donation: createdDonation,
	})
	return JSON.stringify(document)
}
