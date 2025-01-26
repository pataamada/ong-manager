import { Api } from "@/lib/axiosConfig"
import type { IPagination, IPaginationAsaas } from "@/models/pagination.model"
import { IPix } from "@/models/pix.model"

export const listPaginate = async (): Promise<IPagination<IPix> | Error> => {
	try {
		const { data } = await Api.get<IPaginationAsaas<IPix>>("/pix")

		if (data) return data

		return new Error("Erro ao listar pix.")
	} catch (error: unknown) {
		console.log(error)
		return new Error((error as { message: string }).message || "Erro ao listar pix.")
	}
}
