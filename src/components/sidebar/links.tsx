import type { UserRoles } from "@/models/user.model"
import type { IconName } from "../icon"
export const linksByRole: Record<UserRoles, string[]> = {
	ADMIN: ['/dashboard', '/users','/finance', '/schedules', '/animals'],
	AUTHENTICATED: ['/animals', '/schedules'],
}
export const links: {
	href: string
	icon: IconName
	title: string
}[] = [
	{
		href: "/dashboard",
		icon: "House",
		title: "Painel",
	},
	{
		href: "/users",
		icon: "Users",
		title: "Usuários",
	},
	{
		href: "/finance",
		icon: "PiggyBank",
		title: "Financeiro",
	},
	{
		href: "/animals",
		icon: "Dog",
		title: "Animais",
	},
	{
		href: "/schedules",
		icon: "CalendarRange",
		title: "Agenda",
	},
]
