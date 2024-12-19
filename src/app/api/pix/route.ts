import { asaasGateway } from "@/lib/axiosConfig/asaasGateway"
import { IPixPaginate } from "@/types/Asaas/Pix"
import { NextResponse } from "next/server"

export async function GET() {
	const urlRelative = `/pix/addressKeys
`
	try {
		const { data } = await asaasGateway.get<IPixPaginate>(urlRelative)

		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		console.log(error, "error")
		return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
	}
}
