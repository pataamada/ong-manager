import { UserRoles, accessPageList } from "@/models/user.model"
import { SidebarItem } from "./item"
import type { Link } from "./links"

interface LinksProps {
	items: Link[]
	role: UserRoles
	size?: "icon" | "default"
}
export function Links({ role, items, size = "icon" }: LinksProps) {
	const filteredLinks =
		role === UserRoles.Admin
			? items
			: items.filter(link => accessPageList[UserRoles.Authenticated].includes(link.href))
	return (
		<nav className="flex flex-col gap-2">
			{filteredLinks.map(({ href, icon, title }) => (
				<SidebarItem key={href} size={size} href={href} icon={icon} title={title} />
			))}
		</nav>
	)
}
