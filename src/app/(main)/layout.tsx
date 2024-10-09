import BreadCrumb from "@/components/breadcrumb"
import LeftDrawer from "@/components/sidebar/drawer"
import Sidebar from "@/components/sidebar/index"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import type { ReactNode } from "react"

export default async function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const currentUser = await getCurrentUser()
	return (
		<main className="grid grid-col-1 sm:grid-cols-[auto_1fr] h-full bg-zinc-100">
			<Sidebar currentUser={currentUser} />
			<section className="p-6 overflow-y-scroll">
				<div className="flex gap-2 items-center mb-6">
					<LeftDrawer />
					<BreadCrumb />
				</div>
				{children}
			</section>
		</main>
	)
}
