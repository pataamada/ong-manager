import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import type { IClient, IClientCreate } from "@/models/customer.model"
import type { IErrorAsaas, IResponseErrorAsaas } from "@/models/error.model"
import type { IPaginationAsaas } from "@/models/pagination.model"
import { UserRoles } from "@/models/user.model"
import { AxiosError } from "axios"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const currentUser = await getCurrentUser()

	if (currentUser?.role !== UserRoles.Admin) {
		return NextResponse.json({ error: "Acesso negado!" }, { status: 403 })
	}

	try {
		const searchParams = req.nextUrl.searchParams
		const cpf = searchParams.get("cpf")

		const { data } = await asaasGateway.get<IPaginationAsaas<IClient>>(
			`/customers?cpfCnpj=${cpf}`,
		)
		return NextResponse.json(data, { status: 200 })
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return NextResponse.json(
				error.response?.data.errors.map((i: IErrorAsaas) => i.description),
			)
		}
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	const currentUser = await getCurrentUser()

	if (currentUser?.role !== UserRoles.Admin) {
		return NextResponse.json({ error: "Acesso negado!" }, { status: 403 })
	}

	const dataValiding = (await req.json()) as IClientCreate

	try {
		const { data } = await asaasGateway.post<IClient>("/customers", dataValiding)
		return NextResponse.json(data, { status: 201 })
	} catch (error: unknown) {
		console.log(error, "error")
		return NextResponse.json(
			(error as IResponseErrorAsaas).response.data.errors.map(
				(i: IErrorAsaas) => i.description,
			),
		)
	}
}
