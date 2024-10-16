import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Montserrat } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { cn } from "@/lib/utils"
import { CustomQueryClientProvider } from "@/components/query-client-provider"


export const metadata: Metadata = {
	title: "Cãodomínio Satuba",
	description: "Cãodomínio Satuba ONG",
}

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt">
			<body className={cn("antialiased h-screen", montserrat.className)}>
				<Toaster />
				<CustomQueryClientProvider>
					<TooltipProvider>
						<NextTopLoader color="#10b981" showSpinner={false} />
						{children}
					</TooltipProvider>
				</CustomQueryClientProvider>
			</body>
		</html>
	)
}
