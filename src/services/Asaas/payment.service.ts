import { Api } from "@/lib/axiosConfig"
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
		const {data} = await Api.post(urlRelative, form)

		if (data) return data

		return new Error("Erro ao criar cobrança.")
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		console.log(error, 'error')

		return new Error((error as { message: string }).message || "Erro ao criar cobrança.")
	}
}

export const PaymentService = {
	createPayment,
}
