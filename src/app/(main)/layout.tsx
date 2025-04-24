import BreadCrumb from "@/components/breadcrumb"
import { LeftDrawer } from "@/components/sidebar/drawer"
import { Sidebar } from "@/components/sidebar/index"
import type { ReactNode } from "react"

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<>
			<LeftDrawer />
			<main className="grid grid-col-1 sm:grid-cols-[auto_1fr] h-full bg-zinc-100">
				<Sidebar />
				<section className="flex flex-col p-6 overflow-y-scroll">
					<div className="flex gap-2 items-center mb-6">
						<BreadCrumb />
					</div>
					{children}
				</section>
			</main>
		</>
	)
}
