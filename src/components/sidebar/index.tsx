"use client"
import { links } from "./links"
import { UserRoles } from "@/models/user.model"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "nextjs-toploader/app"
import { UserMenu } from "./user-menu"
import { Links } from "./Items"
import { useAuth } from "@/hooks/use-auth"
export const Sidebar = () => {
	const { user, setUser } = useAuth()
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
		setTimeout(() => {
			setUser(null)
		}, 100)
	}
	return (
		<aside className="hidden sm:flex sticky flex-col gap-4 bg-white p-3 border-r border-zinc-300 z-10">
			<UserMenu
				user={{ 
					email: user?.user.email,
					name: user?.user.displayName,
					photo: user?.user.photoURL,
				}}
				onLogout={handleLogout}
			/>
			<Links items={links} role={user?.role || UserRoles.Authenticated} />
		</aside>
	)
}
