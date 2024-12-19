import "server-only"
import type { UserRoles } from "@/models/user.model"
import { envServerSchema } from "@/types/env-schema"
import { type ServiceAccount, cert, getApps, initializeApp } from "firebase-admin/app"
import { type SessionCookieOptions, getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getSession } from "../session"

export const adminService: ServiceAccount = {
	projectId: envServerSchema.projectId,
	clientEmail: envServerSchema.firebaseAdminClientEmail,
	privateKey: envServerSchema.firebaseAdminPrivateKey,
}
export const firebaseApp =
	getApps().find(it => it.name === "firebase-admin-app") ||
	initializeApp(
		{
			credential: cert(adminService),
		},
		"firebase-admin-app",
	)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export async function isUserAuthenticated(session: string | undefined = undefined) {
	const _session = session ?? (await getSession())
	if (!_session) return false
	try {
		const isRevoked = await auth.verifyIdToken(_session, true)
		return !!isRevoked
	} catch {
		return false
	}
}

export async function getCurrentUser() {
	const session = await getSession()
	if (!(await isUserAuthenticated(session))) {
		return null
	}

	const decodedIdToken = await auth.verifyIdToken(session!)
	const currentUser = await auth.getUser(decodedIdToken.uid)
	return { user: currentUser, role: decodedIdToken.role as UserRoles }
}

export function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
	return auth.createSessionCookie(idToken, sessionCookieOptions)
}

export async function revokeAllSessions(session: string) {
	const decodedIdToken = await auth.verifyIdToken(session)

	return await auth.revokeRefreshTokens(decodedIdToken.sub)
}
