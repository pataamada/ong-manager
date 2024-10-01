"use server"
import { actionClient } from "@/actions/safe-action"
import { revokeAllSessions } from "@/lib/firebase/firebase-admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// This schema is used to validate input from client.
export const logout = actionClient.action(async () => {
	const sessionCookie = cookies().get("__session")?.value
	if (!sessionCookie) {
		return
	}
	cookies().delete("__session")
	await revokeAllSessions(sessionCookie)
	redirect("/login")
})
