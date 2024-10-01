import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { redirect,  } from "next/navigation"
import FormLogout from "./form-logout"
import { AuthRequiredError } from "@/lib/exceptions"
import { UserRoles } from "@/models/user.model"

export default async function Dashboard() {
	const currentUser = await getCurrentUser()
	if (!currentUser) {
		return redirect("/login")
	}
	if (currentUser.role !== UserRoles.Authenticated) {
		throw new AuthRequiredError()
	}
	return (
		<div className="flex flex-col p-6">
			<span>{currentUser.user.email}</span>
			<FormLogout />
		</div>
	)
}
