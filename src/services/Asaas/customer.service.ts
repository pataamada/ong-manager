import { Api } from "@/lib/axiosConfig"
import { LINE_LIMIT } from "@/lib/axiosConfig/asaasGateway"
import type { IClient, IClientCreate } from "@/models/customer.model"
import type { IPagination, IPaginationAsaas } from "@/models/pagination.model"

export const listPaginate = async (
	page: number,
	limit: number = LINE_LIMIT,
): Promise<IPagination<IClient> | Error> => {
	try {
		const urlRelative = `/customers?offset=${(page - 1) * 10}&limit=${limit}`
		const { data } = await Api.get<IPaginationAsaas<IClient>>(urlRelative)
		if (data)
			return {
				data: data.data,
				totalCount: data.totalCount,
			}

		return new Error("Erro ao listar clientes.")
	} catch (error: unknown) {
		console.log(error)
		return new Error((error as { message: string }).message || "Erro ao listar clientes.")
	}
}

export const getCustomerByCpfCnpj = async (
	cpfCnpj: string,
): Promise<IPagination<IClient> | Error> => {
	try {
		const urlRelative = `/customers?cpf=${cpfCnpj}`
		const { data } = await Api.get<IPaginationAsaas<IClient>>(urlRelative)
		if (data)
			return {
				data: data.data,
				totalCount: data.totalCount,
			}

		return new Error("Cliente não encontrado.")
	} catch (error: unknown) {
		console.log(error)
		return new Error((error as { message: string }).message || "Erro ao buscar cliente.")
	}
}

export const create = async (form: IClientCreate): Promise<IClient | Error> => {
	try {
		const urlRelative = "/customers"
		const { data } = await Api.post<IClient>(urlRelative, form)
		if (data) return data

		return new Error("Erro ao criar cliente.")
	} catch (error: unknown) {
		console.log(error)
		return new Error((error as { message: string }).message || "Erro ao criar cliente.")
	}
}

export const checkIfCustomerExists = (cpfCnpj: string) => {
	return getCustomerByCpfCnpj(cpfCnpj)
}
