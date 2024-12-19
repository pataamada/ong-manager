"use client"

import { logout } from "@/actions/auth/logout"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useAuth } from "@/hooks/use-auth"
import { UserRoles } from "@/models/user.model"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Menu } from "lucide-react"
import { useRouter } from "nextjs-toploader/app"
import { Button } from "../ui/button"
import { Links } from "./items"
import { links } from "./links"
import { UserMenu } from "./user-menu"
export function LeftDrawer() {
	const { user, setUser } = useAuth()
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
		setTimeout(() => {
			setUser(null)
		}, 1000)
	}
	return (
		<div className="sm:hidden">
			<Drawer direction="left">
				<DrawerTrigger asChild className="w-full">
					<Button size="icon" variant="ghost">
						<Menu size={24} />
					</Button>
				</DrawerTrigger>
				<DrawerContent className="min-w-[250px] h-screen top-0 left-0 right-auto mt-0 rounded-none p-4">
					<DialogTitle className="sr-only">Menu lateral</DialogTitle>
					<div className="flex gap-2">
						<UserMenu
							className="mb-4"
							email={user?.user.email}
							onLogout={handleLogout}
							photo={user?.user.photoURL}
							side="bottom"
						/>
						<div className="flex flex-col">
							<h6>{user?.user.displayName}</h6>
							<span>{user?.user.email}</span>
						</div>
					</div>
					<Links items={links} size="default" role={user?.role || UserRoles.Authenticated} />
				</DrawerContent>
			</Drawer>
		</div>
	)
}
