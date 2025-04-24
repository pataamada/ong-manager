import type { Metadata } from "next"
import "./globals.css"
import "./paw.scss"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ADLaM_Display, Inter, Montserrat } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { cn } from "@/lib/utils"
import QueryProvider from "@/providers/query-provider"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Auth } from "@/components/auth"

export const metadata: Metadata = {
	title: "Pata Amada",
	description: "Pata Amada ONG",
}

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
})

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
})

const adlamDisplay = ADLaM_Display({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-adlam-display",
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={cn(
					"antialiased h-screen",
					montserrat.className,
					adlamDisplay.className,
					inter.className,
				)}
			>
				<Toaster />
				<QueryProvider>
					<TooltipProvider>
						<NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
						<NuqsAdapter>
							<Auth>{children}</Auth>
						</NuqsAdapter>
					</TooltipProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
