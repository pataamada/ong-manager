"use client"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { DialogTitle } from "@radix-ui/react-dialog"
import { links, linksByRole } from "./links"
import { UserRoles } from "@/models/user.model"
import type { UserRecord } from "firebase-admin/auth"
import { useAtomValue } from "jotai"
import { userAtom } from "@/store/user"
import { useHydrateAtoms } from "jotai/utils"
import { SidebarItem } from "./item"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icon } from "../icon"
import { logout } from "@/actions/auth/logout"
export default function LeftDrawer({
	currentUser,
}: { currentUser: { user: UserRecord; role: UserRoles } | null }) {
	useHydrateAtoms([[userAtom, currentUser]])
	const user = useAtomValue(userAtom)
	const handleLogout = async () => {
		await logout()
	}
	const filteredLinks = links.filter(link =>
		linksByRole[user?.role || UserRoles.Authenticated].includes(link.href),
	)
	return (
		<div className="sm:hidden">
			<Drawer direction="left">
				<DrawerTrigger asChild className="w-full">
					<Button size="icon" variant="ghost">
						<Menu size={24} />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="h-screen top-0 left-0 right-auto mt-0 rounded-none p-4">
					<DialogTitle className="sr-only">Menu lateral</DialogTitle>
					<DropdownMenu>
						<DropdownMenuTrigger className="flex gap-2 mb-3">
							<Avatar className="select-none">
								<AvatarImage src={user?.user.photoURL} />
								<AvatarFallback>
									<Icon name="User" />
								</AvatarFallback>
							</Avatar>
							<div>
								<h6>{user?.user.displayName}</h6>
								<p>{user?.user.email}</p>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" sideOffset={8} align="start">
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
							<SidebarItem key={href} href={href} icon={icon} title={title} />
						))}
					</nav>
				</DrawerContent>
			</Drawer>
		</div>
	)
}
