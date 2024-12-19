"use client"

import { routesAliasesList } from "@/utils/route"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export default function BreadCrumb() {
	const pathname = usePathname()
	const pathSegments = pathname.split("/").filter(segment => segment !== "")

	const routes = routesAliasesList

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="text-2xl font-bold text-black"
						href={routes.find(route => route.href === pathname)?.href}
					>
						{routes.find(route => route.href === pathname)?.alias ?? "Nome da roda não definido"}
					</BreadcrumbLink>
				</BreadcrumbItem>
				{pathSegments.map((_, index) => {
					const href = `/${pathSegments.slice(0, index + 1).join("/")}`
					const isLast = index === pathSegments.length - 1

					return (
						<BreadcrumbItem key={href}>
							{isLast ? (
								<BreadcrumbPage>
									{routes.find(route => route.href === href)?.alias ?? "Nome da rota não definido"}
								</BreadcrumbPage>
							) : (
								<>
									<BreadcrumbLink href={href}>
										{routes.find(route => route.href === href)?.alias ??
											"Nome da rota não definido"}
									</BreadcrumbLink>
									<BreadcrumbSeparator />
								</>
							)}
						</BreadcrumbItem>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
