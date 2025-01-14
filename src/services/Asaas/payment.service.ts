import { Api } from "@/lib/axiosConfig"
import type {
	IPayment,
	IPaymentCreateBoletoOrPix,
	IPaymentCreateCreditCard,
} from "@/models/payment.model"

export const createPayment = async (
	form: IPaymentCreateBoletoOrPix | IPaymentCreateCreditCard,
): Promise<IPayment | Error> => {
	try {
		const urlRelative = `/payments?type=${form.billingType}`
		const { data } = await Api.post(urlRelative, form)

		if (data) return data

		return new Error("Erro ao criar cobrança.")
	} catch (error: unknown) {
		console.log(error, "error")
		return new Error((error as { message: string }).message || "Erro ao criar cobrança.")
	}
}
