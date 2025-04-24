"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Icon } from "@iconify/react"
import { useGetSocial } from "@/app/(main)/settings/mutations/use-social"

const socialIcons = {
	instagram: "mdi:instagram",
	facebook: "mdi:facebook",
	whatsapp: "mdi:whatsapp",
	twitter: "mdi:twitter"
}

const formatWhatsAppNumber = (number: string): string => {
	const formattedNumber = number.replace(/\D/g, "")
	return `https://wa.me/${formattedNumber}`
}

export default function Footer() {
	const { data: socials, isLoading } = useGetSocial()

	return (
		<footer className="bg-black text-white py-12 px-4 md:px-8 rounded-t-[40px] mx-4">
			<div className="max-w-4xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
					<div className="col-span-1 md:col-span-4 md:mr-16">
						<Link href="#logo" className="flex items-center">
							<Image
								width={100}
								height={100}
								src="/logo-pata.svg"
								alt="Logo Pata Amada"
								className="w-32 mb-4"
							/>
						</Link>
						<p className="footer-description mb-4">
							Nossa missão é resgatar, cuidar e encontrar lares amorosos para animais abandonados.
						</p>
						<div className="flex flex-row gap-4 mt-4 items-center">
							{isLoading ? (
								// Loading skeleton for social icons
								<>
									{[1, 2, 3].map((i) => (
										<div key={i} className="w-7 h-7 bg-gray-700 rounded-full animate-pulse" />
									))}
								</>
							) : (
								<>
									{socials?.map((social, index: number) => (
										<Link
											key={`${social.type}-${index}`}
											href={social.type === "whatsapp" ? formatWhatsAppNumber(social.content) : social.content}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-white"
										>
											<Icon 
												icon={socialIcons[social.type as keyof typeof socialIcons] || "mdi:help-circle-outline"} 
												className="w-7 h-7" 
											/>
										</Link>
									))}
								</>
							)}
						</div>
					</div>

					<div className="col-span-1 md:col-span-8">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<div className="md:ml-12">
								<h4 className="footer-heading mb-4">Links</h4>
								<ul className="space-y-2">
									<li>
										<Link href="#about" className="footer-subheading hover:text-zinc-400">
											Sobre Nós
										</Link>
									</li>
									<li>
										<Link href="#adopt" className="footer-subheading hover:text-zinc-400">
											Adoção
										</Link>
									</li>
									<li>
										<Link href="#events" className="footer-subheading hover:text-zinc-400">
											Eventos
										</Link>
									</li>
									<li>
										<Link href="#finance" className="footer-subheading hover:text-zinc-400">
											Finanças
										</Link>
									</li>
								</ul>
							</div>

							<div>
								<h4 className="footer-heading mb-4">Contato</h4>
								<ul className="footer-subheading text-zinc-400 space-y-2">
									<li>contato@grupopataamada.com</li>
									<li>Maceió, Alagoas</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="mt-12 pt-8 border-t border-zinc-800">
				<div className="max-w-4xl mx-auto space-y-4">
					<p className="footer-description text-center text-sm">
						Razão Social: ASSOCIACAO CANIL - GATIL LAR TEMPORARIO SAO FRANCISCO DE ASSIS. CNPJ:
						23.871.428/0001-05.
					</p>
					<p className="footer-description text-center text-sm">
						{new Date().getFullYear()} Grupo Pata Amada. Todos os direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	)
}
