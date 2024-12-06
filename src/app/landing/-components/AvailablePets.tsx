"use client"

/* Todo: Pensar em como deixar isso responsivo */

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { Icon } from "@iconify/react"
import { motion, AnimatePresence } from "framer-motion"

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
			"Nina é uma gata de 3 anos, dócil e brincalhona. Com pelagem macia e olhos expressivos, ela adora se aconchegar no colo e receber carinho. Sua natureza curiosa a faz explorar cada cantinho da casa, mas sempre volta para perto de seus humanos favoritos. Já castrada e vacinada, está pronta para trazer alegria ao seu lar.",
		photo: "/adopt-puppies/nina.png",
		tags: ["Gato", "Castrada", "Fêmea"],
	},
	{
		id: 2,
		name: "MisterKat",
		description:
			"MisterKat é um gato elegante de 4 anos que conquistou a todos com seu charme único. Calmo e independente, ele aprecia momentos tranquilos e tem uma personalidade marcante. Adora brincar com bolinhas e se esticar ao sol. Completamente vacinado e castrado, busca um lar que aprecie sua natureza distinta.",
		photo: "/adopt-puppies/misterKat.png",
		tags: ["Gato", "Castrado", "Macho"],
	},
	{
		id: 3,
		name: "Alfredo",
		description:
			"Alfredo é um cachorro de porte médio com 2 anos de idade. Extremamente carinhoso e sociável, ele se dá bem com outros animais e crianças. Sua energia contagiante e lealdade fazem dele um companheiro perfeito para famílias ativas. Castrado e com todas as vacinas em dia, está ansioso para encontrar seu lar definitivo.",
		photo: "/adopt-puppies/alfredo.png",
		tags: ["Cachorro", "Castrado", "Macho"],
	},
	{
		id: 4,
		name: "Thor",
		description:
			"Thor é um cachorro forte e gentil de 3 anos. Com sua personalidade brincalhona e protetora, ele é o companheiro ideal para aventuras ao ar livre. Apesar do seu porte imponente, é extremamente dócil e carinhoso com todos. Treinado, castrado e vacinado, está pronto para ser parte de uma família amorosa.",
		photo: "/adopt-puppies/thor.png",
		tags: ["Cachorro", "Castrado", "Macho"],
	},
	{
		id: 5,
		name: "Valentina",
		description:
			"Valentina é uma cachorra meiga de 1 ano e meio que conquista a todos com seu olhar doce. Muito esperta e afetuosa, ela adora aprender truques novos e brincar com seus brinquedos favoritos. Sua energia positiva contagia o ambiente. Já castrada e com todas as vacinas em dia, está pronta para encontrar uma família para chamar de sua.",
		photo: "/adopt-puppies/valentina.png",
		tags: ["Cachorro", "Castrada", "Fêmea"],
	},
]

export function AvailablePets() {
	const [selectedPet, setSelectedPet] = useState<Pet>(availablePets[0])

	return (
		<div className="text-center ">
			<h3 className="text-4xl font-bold">
				Conheça nossos
				<span className="text-[#10B981]"> peludos!</span>
			</h3>
			<p className="text-2xl mb-16 text-gray-600">Eles adoram carinho e merecem amor!</p>

			<div className="flex flex-wrap lg:flex-nowrap gap-8 mt-8 ">
				<div className="justify-between flex flex-col">
					<div className="rounded-lg ">
						<div className="flex flex-wrap gap-2 mb-4">
							{selectedPet.tags.map(tag => (
								<span
									key={tag}
									className="text-paragraph-2 text-zinc-800 bg-zinc-200 px-2 py-0.5 rounded-full"
								>
									<p>{tag}</p>
								</span>
							))}
						</div>

						<h3 className="text-h3 text-zinc-800 mb-2 text-left">{selectedPet.name}</h3>
						<p className="text-zinc-500 text-subtitle text-left mb-4 h-[180px] overflow-hidden text-ellipsis line-clamp-5">
							{selectedPet.description}
						</p>

						<div className="flex flex-row gap-4 mt-2 text-center mx-auto">
							{/* TODO: Adicionar funcionalidades para os botões */}
							<Button className="px-4 flex items-center gap-2">
								<Icon icon="fa-solid:paw" width={16} height={16} />
								Adotar
							</Button>
							<Button
								className="border-2 border-primary text-primary font-semibold hover:bg-gray-100 hover:text-primary transition-colors"
								variant={"outline"}
							>
								Apadrinhar
							</Button>
						</div>
					</div>

					<div className="flex gap-2 mt-4">
						{availablePets.map(pet => (
							<button
								key={pet.id}
								type="button"
								onClick={() => setSelectedPet(pet)}
								className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ease-in-out 
									aspect-square w-[150px] bg-cover bg-center bg-no-repeat border-transparent
									hover:scale-105
									${selectedPet.id === pet.id ? "!border-primary" : " hover:border-emerald-400"}`}
								style={{
									backgroundImage: `url(${pet.photo})`,
								}}
							/>
						))}
					</div>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={selectedPet.id}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Image
							src={selectedPet.photo}
							alt={`Foto do ${selectedPet.name}`}
							className="max-w-[450px] max-h-[550px] rounded-lg"
							width={450}
							height={550}
						/>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}
