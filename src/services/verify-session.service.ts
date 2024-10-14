import type { UserRoles } from "@/models/user.model"
import type { UserRecord } from "firebase-admin/auth"
import type { NextRequest } from "next/server"
export const verifySession = async (request: NextRequest, session: string) => {
	const verifyRequest = await fetch(new URL("api/auth/verify-session", request.nextUrl), {
		method: "POST",
		body: JSON.stringify({ session }),
		next: { revalidate: 30 },
	})
	const response: { user: null; role: null } | { user: UserRecord; role: UserRoles } =
		await verifyRequest.json()
	return response
}
