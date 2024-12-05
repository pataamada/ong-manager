import { POST } from "@/app/api/payment/paymentRoute"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/types/Asaas/Payment"

const createPayment = async (
	form: IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard,
): Promise<IPayment | Error> => {
	try {
		const urlRelative = `/payments?type=${form.billingType}`
		const response = await POST(urlRelative, form)

		const data = await response.json()
		if (data) return data

		return new Error("Erro ao criar cobrança.")
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.log(error)

		return new Error((error as { message: string }).message || "Erro ao criar cobrança.")
	}
}

export const PaymentService = {
	createPayment,
}
