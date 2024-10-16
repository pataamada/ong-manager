"use client"
import { links } from "./links"
import type { UserRecord } from "firebase-admin/auth"
import { UserRoles } from "@/models/user.model"
import { logout } from "@/actions/auth/logout"
import { useRouter } from "nextjs-toploader/app"
import { UserMenu } from "./user-menu"
import { Links } from "./Items"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { userAtom } from "@/store/user"
export const Sidebar = ({
	currentUser,
}: { currentUser: { user: UserRecord; role: UserRoles } | null }) => {
	useHydrateAtoms([[userAtom, currentUser]], { dangerouslyForceHydrate: true })
	const [user, setUser] = useAtom(userAtom)
	const router = useRouter()
	const handleLogout = async () => {
		await logout()
		router.replace("/login")
		setTimeout(() => {
			setUser(null)
		}, 100)
	}
	return (
		<aside className="hidden sm:flex sticky flex-col gap-4 bg-white p-3 border-r border-zinc-300">
			<UserMenu email={user?.user.email} onLogout={handleLogout} photo={user?.user.photoURL} />
			<Links items={links} role={user?.role || UserRoles.Authenticated} />
		</aside>
	)
}
