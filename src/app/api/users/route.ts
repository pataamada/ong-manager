import { findAll } from "@/services/user.service"
import { NextResponse } from "next/server"
// request: Request
export async function GET() {
	try {
		const users = await findAll()
        return NextResponse.json({ users })
	} catch (error) {
        return NextResponse.json({ message: "Erro ao buscar os usuários" })
    }
}
