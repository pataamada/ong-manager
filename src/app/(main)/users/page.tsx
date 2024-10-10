import { UserList } from "./_components/user-list"
import { findAll } from "@/services/user.service"

export default async function Users() {
	const users = await findAll() // fazer paginação
	return <UserList users={users}/>
}
