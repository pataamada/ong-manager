import { auth, isUserAuthenticated, revokeAllSessions } from "@/lib/firebase/firebase-admin"
import type { UserRoles } from "@/models/user.model"
import { NextResponse } from "next/server"
// request: Request
export async function POST(request: Request) {
	const body = await request.json()
	const session = body.session
	try {
		const isAuthenticated = await isUserAuthenticated(session)
		if (!isAuthenticated) {
			if (session) {
				await revokeAllSessions(session)
			}
			return NextResponse.json({ user: null, role: null })
		}
		const decodedIdToken = await auth.verifyIdToken(session!)
		const currentUser = await auth.getUser(decodedIdToken.uid)
        return NextResponse.json({ user: currentUser, role: decodedIdToken.role as UserRoles })
	} catch (error) {
        return NextResponse.json({ user: null, role: null })
    }
}
