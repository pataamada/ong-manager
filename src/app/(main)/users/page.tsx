import { UserList } from "./_components/user-list"
import { findAll } from "@/services/user.service"
import { SidebarProvider} from "@/components/ui/sidebar"


export default async function Users() {
	const users = await findAll() // fazer paginação
	return ( 
	<SidebarProvider> 
	<UserList users={users}/>
	</SidebarProvider> 
	)
}
