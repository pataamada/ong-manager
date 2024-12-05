"use client"

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Menu } from "lucide-react"
import { Button } from "../ui/button"
import { DialogTitle } from "@radix-ui/react-dialog"
import { links } from "./links"
import { UserRoles } from "@/models/user.model"
import { logout } from "@/actions/auth/logout"
import { UserMenu } from "./user-menu"
import { Links } from "./Items"
import { useRouter } from "nextjs-toploader/app"
import { observer } from "@legendapp/state/react"
import { user$ } from "@/store/user"
import Image from "next/image"

function LeftDrawer() {
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
		setTimeout(() => {
			user$.delete()
		}, 100)
	}
	return (
		<div className="sm:hidden px-6 py-2 flex items-center bg-white min-h-[64px] drop-shadow-md sticky top-0">
			<Drawer direction="left">
				<div className="flex justify-between w-full items-center">
					<DrawerTrigger>
						<Menu className="size-6" />
					</DrawerTrigger>
					<Image
						src="/logo-h.svg"
						width={150}
						height={40}
						alt="Pata Amada Logo"
					/>
				</div>
				<DrawerContent className="min-w-[250px] h-screen top-0 left-0 right-auto mt-0 rounded-none p-4">
					<DialogTitle className="sr-only">Menu lateral</DialogTitle>
					<div className="flex gap-2">
						<UserMenu
							className="mb-4"
							email={user$.get()?.user.email}
							onLogout={handleLogout}
							photo={user$.get()?.user.photoURL}
							side="bottom"
						/>
						<div className="flex flex-col">
							<h6>{user$.get()?.user.displayName}</h6>
							<span>{user$.get()?.user.email}</span>
						</div>
					</div>
					<Links items={links} size="default" role={user$.get()?.role || UserRoles.Authenticated} />
				</DrawerContent>
			</Drawer>
		</div>
	)
}
export default observer(LeftDrawer)
