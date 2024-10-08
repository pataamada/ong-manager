"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { links, linksByRole } from "./links"
import { SidebarItem } from "./item"
import { Icon } from "../icon"
import type { UserRecord } from "firebase-admin/auth"
import { useAtomValue } from "jotai"
import { userAtom } from "@/store/user"
import { useHydrateAtoms } from "jotai/utils"
import { UserRoles } from "@/models/user.model"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "nextjs-toploader/app"

export function Sidebar({
	currentUser,
}: { currentUser: { user: UserRecord; role: UserRoles } | null }) {
	useHydrateAtoms([[userAtom, currentUser]])
	const user = useAtomValue(userAtom)
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
	}
	const filteredLinks = links.filter(link =>
		linksByRole[user?.role || UserRoles.Authenticated].includes(link.href),
	)
	return (
		<aside className="hidden sm:flex sticky flex-col gap-4 bg-white p-3 border-r border-zinc-300">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="select-none">
						<AvatarImage src={user?.user.photoURL} />
						<AvatarFallback>
							<Icon name="User" />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right" sideOffset={8} align="start">
					<DropdownMenuLabel>{user?.user.email}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="gap-2 text-red-500" onClick={handleLogout}>
						<Icon name="DoorOpen" size={16} />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<nav className="flex flex-col gap-2">
				{filteredLinks.map(({ href, icon, title }) => (
					<SidebarItem key={href} size="icon" href={href} icon={icon} title={title} />
				))}
			</nav>
		</aside>
	)
}
