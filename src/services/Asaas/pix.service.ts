import { Api } from "@/lib/axiosConfig"
import type { IClient } from "@/models/customer.model"
import type { IPagination, IPaginationAsaas } from "@/models/pagination.model"

export const listPaginate = async (): Promise<IPagination<IClient> | Error> => {
	try {
		const { data } = await Api.get<IPaginationAsaas<IClient>>("/pix")

		if (data) return data

		return new Error("Erro ao listar pix.")
	} catch (error: unknown) {
		console.log(error)
		return new Error((error as { message: string }).message || "Erro ao listar pix.")
	}
}
