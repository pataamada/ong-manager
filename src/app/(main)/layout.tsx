import type { ReactNode } from "react"

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return <main className="flex h-svh p-10">{children}</main>
}
