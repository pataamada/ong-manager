"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { Heart, Menu, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { UserRoles } from "@/models/user.model"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/utils/get-initials"

const navigationItems = [
	{ href: "#start", label: "Início" },
	{ href: "#events", label: "Eventos" },
	{ href: "#about", label: "Sobre" },
	{ href: "#finance", label: "Finanças" },
]

export default function Header() {
	const { user } = useAuth()
	
	const destination = {
		[UserRoles.Authenticated]: "/animals",
		[UserRoles.Admin]: "/dashboard",
	}

	return (
		<header className="w-full h-[120px] py-[30px] absolute top-0 navbar flex justify-between items-center z-10">
				<div className="w-full max-w-[1700px] mx-auto">
					<div className="flex justify-between items-center mx-6 md:mx-10">
						<Image src="/landing/logo_white.svg" alt="Logo pata amada" width={140} height={60} />
						<div className="gap-[40px] items-center hidden lg:flex">
							{navigationItems.map((item, index) => (
								<Link className="link" key={`${item.label}-${index}`} href={item.href}>
									{item.label}
								</Link>
							))}

							{user ? (
								<Link href={user.role ? destination[user.role] : "/login"}>
									<div className="flex items-center gap-3">
										<Avatar className="h-9 w-9">
											<AvatarImage src={user.user.photoURL || undefined} alt={user.user.displayName || "User"} />
											<AvatarFallback className="bg-red-500 text-white">
												{getInitials(user.user.displayName || "User")}
											</AvatarFallback>
										</Avatar>
										<span className="text-white font-medium hidden md:block">
											{user.user.displayName || "Usuário"}
										</span>
									</div>
								</Link>
							) : (
								<Link href="/login">
									<Button className="flex gap-[10px] rounded-[20px] !font-semibold hero-button">
										ENTRAR <User fill="white" size={20} />
									</Button>
								</Link>
							)}
						</div>
					</div>
				</div>
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
							{user && (
								<div className="flex items-center gap-3 p-4 border-b border-gray-100">
									<Avatar className="h-9 w-9">
										<AvatarImage src={user.user.photoURL || undefined} alt={user.user.displayName || "User"} />
										<AvatarFallback className="bg-red-500 text-white">
											{getInitials(user.user.displayName || "User")}
										</AvatarFallback>
									</Avatar>
									<span className="text-zinc-800 font-medium">
										{user.user.displayName || "Usuário"}
									</span>
								</div>
							)}
							{navigationItems.map(item => (
								<Link
									key={item.href}
									href={item.href}
									className="text-zinc-800 py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg drawer-link"
								>
									{item.label}
								</Link>
							))}
							{user ? (
								<Link href={user.role ? destination[user.role] : "/login"}>
									<Button className="button w-full h-[40px] rounded-tl-lg p-2 px-4 flex items-center justify-center gap-2 mt-4 text-white">
										Minha Conta
										<User size={20} />
									</Button>
								</Link>
							) : (
								<Link href="/animals">
									<Button className="button w-full h-[40px] rounded-tl-lg p-2 px-4 flex items-center justify-center gap-2 mt-4 text-white">
										Quero adotar
										<Heart fill="white" size={20} />
									</Button>
								</Link>
							)}
						</nav>
					</SheetContent>
				</Sheet>
		</header>
	)
}
