import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { redirect,  } from "next/navigation"
import { AuthRequiredError } from "@/lib/exceptions"
import { UserRoles } from "@/models/user.model"

export default async function Dashboard() {
	const currentUser = await getCurrentUser()
	if (!currentUser) {
		return redirect("/login")
	}
	if (currentUser.role !== UserRoles.Admin) {
		throw new AuthRequiredError()
	}
	return (
		<div className="flex flex-col">
			<span>{currentUser.user.email}</span>
		</div>
	)
}
