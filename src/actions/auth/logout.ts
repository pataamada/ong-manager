"use server"
import { actionClient } from "@/actions/safe-action"
import { revokeAllSessions } from "@/lib/firebase/firebase-admin"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = actionClient.action(() => {
	revalidatePath("/login")
	const sessionCookie = cookies().get("__session")?.value
	if (!sessionCookie) {
		redirect("/login")
	}
	cookies().delete("__session")
	revokeAllSessions(sessionCookie)
	redirect("/login")
})