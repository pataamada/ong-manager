"use client"
import { logout } from "@/actions/auth/logout"
import { useAuth } from "@/hooks/use-auth"
import { UserRoles } from "@/models/user.model"
import { useRouter } from "nextjs-toploader/app"
import { Links } from "./items"
import { links } from "./links"
import { UserMenu } from "./user-menu"
export const Sidebar = () => {
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
		<aside className="hidden sm:flex sticky flex-col gap-4 bg-white p-3 border-r border-zinc-300">
			<UserMenu email={user?.user.email} onLogout={handleLogout} photo={user?.user.photoURL} />
			<Links items={links} role={user?.role || UserRoles.Authenticated} />
		</aside>
	)
}
