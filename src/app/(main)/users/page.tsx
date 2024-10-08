import { UserList } from "./_components/user-list"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { AuthRequiredError } from "@/lib/exceptions"
import { UserRoles } from "@/models/user.model"
import { redirect } from "next/navigation"
import { findAll } from "@/services/user.service"

export default async function Users() {
	const users = await findAll() // fazer paginação
	const currentUser = await getCurrentUser()
	if (!currentUser) {
		return redirect("/login")
	}
	if (currentUser.role !== UserRoles.Admin) {
		throw new AuthRequiredError()
	}
	return <UserList users={users}/>
}
