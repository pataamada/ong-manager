import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"

import { Heart, Menu, User } from "lucide-react"

/* TODO: Validar navegação */
const navigationItems = [
	{ href: "#start", label: "Início" },
	{ href: "#events", label: "Eventos" },
	{ href: "#about", label: "Sobre" },
	{ href: "#finance", label: "Finanças" },
	// { href: "#campaigns", label: "Campanhas" },
]

export default function Header() {
	return (
		<header className="w-full relative">
			<div className="w-full h-[120px] py-[30px] absolute top-0 navbar flex justify-between items-center">
				{/* Desktop View */}
				<div className="w-full max-w-[1700px] mx-auto">
					<div className="flex justify-between items-center mx-6 md:mx-10">
						<Image src="/landing/logo_white.svg" alt="Logo pata amada" width={140} height={60} />
						<div className="gap-[40px] items-center hidden lg:flex">
							{navigationItems.map((item, index) => (
								<Link className="link" key={`${item.label}-${index}`} href={item.href}>
									{item.label}
								</Link>
							))}

							<Link href="/login">
							<Button className="flex gap-[10px] rounded-[20px] !font-semibold hero-button">
							ENTRAR <User fill="white" size={20} />  
							</Button>
							</Link>
						</div>
					</div>
				</div>
				{/* Mobile View */}
				<Sheet>
					<SheetTrigger asChild className="mx-6">
						<Button variant="ghost" size="icon" className="lg:hidden">
							<Menu color="white" size={24} />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[300px] sm:w-[400px] border-l">
						<SheetHeader className="mb-6">
							<SheetTitle className="text-2xl font-bold text-zinc-800">Menu</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col gap-4 navbar">
							{navigationItems.map(item => (
								<Link
									key={item.href}
									href={item.href}
									className="text-zinc-800 py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg drawer-link"
								>
									{item.label}
								</Link>
							))}
							<Link href="/animals">
							<Button className="button w-full h-[40px] rounded-tl-lg p-2 px-4 flex items-center justify-center gap-2 mt-4 text-white"
							>
								Quero adotar
								<Heart fill="white" size={20} />
							</Button>
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
