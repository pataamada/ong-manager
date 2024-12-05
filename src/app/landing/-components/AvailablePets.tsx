"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Icon } from "@iconify/react"

type Pet = {
	id: number
	name: string
	description: string
	photo: string
	tags: string[]
}

const availablePets: Pet[] = [
	{
		id: 1,
		name: "Nina",
		description:
			"Nina é uma gata de 2 anos curiosa e carinhosa, que adora explorar a casa e observar o movimento pela janela. Brincalhona, mas também afetuosa, ela gosta de se aconchegar nos momentos tranquilos. Sua mistura de travessura e doçura conquista todos ao redor.",
		photo: "/adopt-puppies/Card.png",
		tags: ["Gato", "Castrada", "Fêmea"],
	},
	{
		id: 2,
		name: "Thor",
		description:
			"Thor é um cachorro brincalhão e muito carinhoso. Ele adora brincar com bolinhas e fazer novos amigos!",
		photo: "/adopt-puppies/Card.png",
		tags: ["Cachorro", "Castrado", "Macho"],
	},
	{
		id: 3,
		name: "Luna",
		description:
			"Luna é uma gatinha tranquila e amorosa. Ela adora carinho e é perfeita para apartamentos!",
		photo: "/adopt-puppies/Card.png",
		tags: ["Gato", "Castrada", "Fêmea"],
	},
]

export function AvailablePets() {
	const [selectedPet, setSelectedPet] = useState<Pet>(availablePets[0])

	return (
		<div className="text-center">
			<h3 className="text-4xl font-bold">
				Conheça nossos
				<span className="text-[#10B981]"> peludos!</span>
			</h3>
			<p className="text-2xl mb-16 text-gray-600">Eles adoram carinho e merecem amor!</p>

			<div className="flex flex-wrap lg:flex-nowrap items-start justify-center gap-8 mt-8">
				<div className="flex-1 max-w-[400px]">
					<div className="bg-white p-4 rounded-lg">
						<div className="flex flex-wrap gap-2 mb-4">
							{selectedPet.tags.map(tag => (
								<span
									key={tag}
									className="bg-gray-100 text-black text-sm font-medium px-4 py-2 rounded-full"
								>
									{tag}
								</span>
							))}
						</div>

						<h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedPet.name}</h2>
						<p className="text-gray-600 mb-4">{selectedPet.description}</p>

						<div className="flex flex-row gap-4 mt-2 text-center mx-auto">
							<Button className="w-44 h-10 bg-[#10B981] text-white rounded-tl-lg px-4 flex items-center gap-2 hover:bg-[#0D9668] transition-colors">
								<Icon icon="ph:paw-print" width={16} height={16} />
								Quero adotar!
							</Button>
							<Button className="w-44 h-10 bg-white text-[#10B981] border-2 border-[#10B981] rounded-tl-lg px-4 flex items-center gap-2 hover:bg-gray-100 transition-colors">
								<Icon icon="ph:paw-print" width={16} height={16} />
								Apadrinhar
							</Button>
						</div>
					</div>
					
					<div className="flex gap-2 mt-4 justify-center">
						{availablePets.map(pet => (
							<button
								key={pet.id}
								type="button"
								onClick={() => setSelectedPet(pet)}
								className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
									selectedPet.id === pet.id
										? "border-[#10B981]"
										: "border-transparent hover:border-gray-200"
								}`}
							>
								<Image
									src={pet.photo}
									alt={`Miniatura do ${pet.name}`}
									width={64}
									height={64}
									className="w-full h-full object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				<div className="w-[350px] h-[450px] rounded-[16px] bg-gray-200 overflow-hidden">
					<Image
						src={selectedPet.photo}
						alt={`Foto do ${selectedPet.name}`}
						width={350}
						height={450}
						className="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	)
}
