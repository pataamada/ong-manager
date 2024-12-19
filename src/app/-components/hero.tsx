import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"
import Image from "next/image"
import heroImage from '../../../public/landing/hero.jpg'

export default function Hero() {
	/* TODO: Funcionalidade dos botões */
	return (
		<div className="hero-section w-full min-h-dvh bg-cover bg-center bg-no-repeat flex items-center pt-0 sm:pt-32
		"
		style={{ backgroundImage: `url(${heroImage.src})` }}
		>
			<div className="w-full max-w-[1700px] mx-auto">
				<div className="mx-6 md:mx-10 max-w-[650px]">
					<p className="title text-pretty max-w-[800px]">Faça a Diferença na Vida de um Animal</p>
					<p className="subtitle hidden sm:block max-w-[600px]">
						Nossa missão é resgatar, cuidar e encontrar lares amorosos para animais abandonados.
						Sabemos que cada animal merece uma chance de viver com dignidade, amor e carinho, e com
						a sua ajuda podemos transformar essa realidade!
					</p>
					<div className="flex sm:mt-12 sm:mb-16 my-8 sm:my-0 gap-[20px] flex-wrap">
						<a href="/animals">
						<Button className="flex gap-[10px] rounded-[20px] !font-semibold button">
							<Heart fill="white" size={20} /> ADOTE <ArrowRight size={24} strokeWidth={4} />
						</Button>
						</a>
						<Button
							className="rounded-[20px] bg-transparent text-white border-2 font-bold button"
							variant="outline"
						>
							FALE CONOSCO
						</Button>
					</div>
					<div className="info-section flex flex-col sm:flex-row gap-8 sm:gap-0">
						<div className="md:pr-7 pr-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">100+</p>
							<span className="text-zinc-300">Animais Resgatados</span>
						</div>
						<div className="md:px-9 px-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
							<span className="text-zinc-300">Doações</span>
						</div>
						<div className="md:pl-7 pl-0">
							<p className="text-4xl md:text-5xl font-bold mb-2">10+</p>
							<span className="text-zinc-300">Anos de Existência</span>
						</div>
					</div>
				</div>
				<div className="w-[260px] hidden lg:flex flex-col items-center qrcode-container p-4 gap-3 absolute bottom-32 right-28 bg-black/30 backdrop-blur-sm rounded-lg">
					<span className="text-zinc-100 text-center">
						Escaneie o QR Code abaixo e contribua com sua doação
					</span>
					<div className="w-[220px] h-[220px] bg-white rounded-md p-4 flex items-center justify-center" >
					<Image src="/landing/qrcode.png" alt="QR Code" width={220} height={220}/>
					</div>
				</div>
			</div>
		</div>
	)
}
