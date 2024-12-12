import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { LucideCheck } from "lucide-react"

export default function AnimalsCard() {
	return (
		<Card className="max-w-72 h-96">
			<Image
				src={"/image.png"}
				width={288}
				height={242}
				priority
				alt="imagem do animal"
				className="object-cover"
			/>
			<CardContent className="p-4 content-center">
				<CardHeader className="flex flex-row p-0 pb-2 items-end justify-between">
					<div className="font-semibold  text-zinc-800 text-2xl">Lola</div>
					<span className="flex items-end">
						<Badge className="bg-emerald-400 text-white">
							Disponível
							<LucideCheck className="pl-1" />
						</Badge>
					</span>
				</CardHeader>
				<div className="flex flex-col">
					<div className="flex flex-row gap-y-1 justify-between">
						<p className="text-zinc-400 text-base text-start">Idade</p>
						<p className="text-zinc-600 text-base text-end">02 anos</p>
					</div>
					<div className="flex flex-row gap-y-1 justify-between">
						<div className="text-zinc-400 text-base text-start">Sexo</div>
						<div className="text-zinc-600 text-base text-end">Fêmea</div>
					</div>
					<div className="flex flex-row gap-y-1 justify-between">
						<div className="text-zinc-400 text-base text-start flex-auto">Data de Cadastro</div>
						<div className="text-zinc-600 text-base text-end">05/10/2024</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
