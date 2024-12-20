"use client"

import { routesAliasesList } from "@/utils/route"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export default function BreadCrumb() {
	const pathname = usePathname()
	const pathSegments = pathname.split("/").filter(segment => segment !== "")
	const currentRoute = routesAliasesList.find(
		route => pathname.includes(route.href) || route.href.includes(pathname),
	)
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="text-2xl font-bold text-black"
						href={currentRoute?.href}
					>
						{currentRoute?.alias ?? "Nome da roda não definido"}
					</BreadcrumbLink>
				</BreadcrumbItem>
				{pathSegments.map((_, index) => {
					const href = `/${pathSegments.slice(0, index + 1).join("/")}`
					const isLast = index === pathSegments.length - 1

					return (
						<div key={href}>
							<BreadcrumbItem>
								<BreadcrumbLink href={`${href}-index`}>
									{routesAliasesList.find(route => route.href === href)?.alias}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</div>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
