import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
	title: "Cãodomínio Satuba",
	description: "Cãodomínio Satuba ONG",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt">
			<body className={"antialiased h-screen"}>
				<Toaster />
				<TooltipProvider>
					<NextTopLoader color="#10b981" showSpinner={false} />
					{children}
				</TooltipProvider>
			</body>
		</html>
	)
}
