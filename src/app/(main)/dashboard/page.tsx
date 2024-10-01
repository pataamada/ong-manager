import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { redirect } from "next/navigation"
import FormLogout from "./form-logout"

export default async function Dashboard() {
	const currentUser = await getCurrentUser()
	if (!currentUser) {
		return redirect("/login")
	}
	return (
		<div className="flex flex-col p-6">
			<span>{currentUser.email}</span>
			<FormLogout />
		</div>
	)
}
