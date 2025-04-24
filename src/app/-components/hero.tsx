"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"
import { useContact } from "@/utils/contact"
import { useSettings } from "@/app/(main)/settings/mutations/use-settings"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { OngQrCode } from "./ong-qr-code"

export default function Hero() {
	const { handleContact } = useContact()
	const { data: settings } = useSettings()

	return (
		<div
			className="hero-section w-full min-h-dvh bg-no-repeat bg-center bg-cover flex items-center pt-0 sm:pt-32 relative"
		>
			<div className="w-full max-w-[1700px] mx-auto">
				<div className="mx-6 md:mx-10 max-w-[650px]">
					<p className="title text-pretty max-w-[800px] text-center sm:text-left">
						Faça a Diferença na Vida de um Animal
					</p>
					<p className="subtitle hidden sm:block max-w-[600px]">
						Nossa missão é resgatar, cuidar e encontrar lares amorosos para animais
						abandonados. Sabemos que cada animal merece uma chance de viver com
						dignidade, amor e carinho, e com a sua ajuda podemos transformar essa
						realidade!
					</p>
					<div className="flex sm:mt-12 sm:mb-16 my-8 sm:my-0 gap-[20px] flex-wrap">
						<Button
							className="flex gap-[10px] rounded-[20px] !font-semibold button"
							onClick={() => handleContact({})}
						>
							<Heart fill="white" size={20} /> ADOTE
							<ArrowRight size={24} strokeWidth={4} />
						</Button>
						<Button
							className="rounded-[20px] bg-transparent text-white border-2 font-bold button"
							variant="outline"
							onClick={() => handleContact({})}
						>
							FALE CONOSCO
						</Button>
					</div>
					<div className="info-section  flex-col sm:flex-row gap-8 sm:gap-0 hidden md:flex">
						<div className="lg:pr-7 pr-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">100+</p>
							<span className="text-zinc-300">Animais Resgatados</span>
						</div>
						<div className="lg:px-9 px-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
							<span className="text-zinc-300">Doações</span>
						</div>
						<div className="lg:pl-7 pl-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">10+</p>
							<span className="text-zinc-300">Anos de Existência</span>
						</div>
					</div>
				</div>
				{settings?.paymentMethod?.qrCode && (
					<div className="lg:w-[260px] w-[220px] flex-col items-center qrcode-container p-4 gap-3 absolute lg:bottom-32 lg:right-28 md:bottom-10 md:right-4 bottom-10 right-1/2 sm:right-auto translate-x-1/2 sm:translate-x-0 bg-black/30 backdrop-blur-sm rounded-lg group">
						<span className="text-zinc-100 text-center">
							Escaneie o QR Code abaixo e contribua com sua doação
						</span>
						<Suspense
							fallback={
								<div className="m-auto lg:w-[168px] w-[148px] aspect-square bg-white rounded-md p-4 flex items-center justify-center my-4 ">
									<Loader2 className="animate-spin size-8 text-primary" />
								</div>
							}
						>
							<OngQrCode />
						</Suspense>
					</div>
				)}
			</div>
		</div>
	)
}
