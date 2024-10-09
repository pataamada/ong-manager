"use client"
import { links } from "./links"
import type { UserRecord } from "firebase-admin/auth"
import { UserRoles } from "@/models/user.model"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "nextjs-toploader/app"
import { UserMenu } from "./user-menu"
import { Links } from "./Items"
import { observer, useObserve } from "@legendapp/state/react"
import { user$ } from "@/store/user"
const Sidebar = ({
	currentUser,
}: { currentUser: { user: UserRecord; role: UserRoles } | null }) => {
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
		setTimeout(() => {
			user$.delete()
		}, 100)
	}
	useObserve(() => {
		user$.set(currentUser)
	})
	return (
		<aside className="hidden sm:flex sticky flex-col gap-4 bg-white p-3 border-r border-zinc-300">
			<UserMenu
				email={user$.get()?.user.email}
				onLogout={handleLogout}
				photo={user$.get()?.user.photoURL}
			/>
			<Links items={links} role={user$.get()?.role || UserRoles.Authenticated} />
		</aside>
	)
}

export default observer(Sidebar)
