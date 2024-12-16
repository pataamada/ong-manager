import type { Metadata } from "next"
import "./globals.css"
import "./paw.scss"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Montserrat } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import { cn } from "@/lib/utils"
import QueryProvider from "@/providers/query-provider"
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

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
				<QueryProvider>
					<TooltipProvider>
						<NextTopLoader color="#10b981" showSpinner={false} />
							<MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
					</TooltipProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
