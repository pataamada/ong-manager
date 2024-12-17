<<<<<<< HEAD
import { UserList } from "./_components/user-list"

export default function Users() {
	return <UserList />
=======
import { UsersTable } from "./_components/user-table"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { AuthRequiredError } from "@/lib/exceptions"
import { UserRoles } from "@/models/user.model"
import { redirect } from "next/navigation"

export default async function Users() {
	const currentUser = await getCurrentUser()
	if (!currentUser) {
		return redirect("/login")
	}
	if (currentUser.role !== UserRoles.Authenticated) {
		throw new AuthRequiredError()
	}
	return <UsersTable />
>>>>>>> e20437b (feat: avatar on user row, validate users page, change primary color)
}
