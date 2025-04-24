type Route = {
	alias: string
	href: string
}

export const routesAliasesList: Route[] = [
	{
		alias: "Início",
		href: "/dashboard",
	},
	{
		alias: "Usuários",
		href: "/users",
	},
	{
		alias: "Animais",
		href: "/animals",
	},
	{
		alias: "Financeiro",
		href: "/finance",
	},
	{
		alias: "Agenda",
		href: "/schedules",
	},
	{
		alias: "Configurações",
		href: "/settings",
	},
]
