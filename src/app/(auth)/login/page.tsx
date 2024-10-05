import React from "react"

import FormLogin from "./form-login"
import { isUserAuthenticated } from "@/lib/firebase/firebase-admin"
import { redirect } from "next/navigation"

export default async function Login() {
	const isAuthenticated = await isUserAuthenticated()
	if (isAuthenticated) return redirect("/dashboard")
	return (
				<FormLogin />
	
	)
}
