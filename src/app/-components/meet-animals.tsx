"use client"

import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import { ArrowRight, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useAutoplay } from "./embla-carousel/autoplay"
import { useGetAnimals } from "@/app/(main)/animals/_components/mutations"
import { When } from "@/components/when"
import { Skeleton } from "@/components/ui/skeleton"
import { useContact } from "@/utils/contact"
import type { Animal } from "@/models/animal.model"
import { getAge } from "@/utils/get-age"
import { Timestamp } from "firebase/firestore"



const AnimalSkeleton = () => {
	return (
		<div className="flex-[0_0_auto] mx-4 relative mt-auto">
			<div className="relative group overflow-visible">
				<div className="lg:w-[500px] w-[300px] aspect-square relative">
					<Skeleton className="w-full h-full rounded-xl" />
					<div className="absolute bottom-0 left-0 right-0 bg-[#18181b80] p-4 rounded-lg mb-6 mx-5">
						<Skeleton className="h-8 w-32" />
						<div className="flex flex-wrap gap-2 mt-5">
							<Skeleton className="h-10 w-32 rounded-[20px]" />
							<Skeleton className="h-10 w-32 rounded-[20px]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const MeetAnimals = () => {
	const { data: animals, isLoading } = useGetAnimals()
	const [availableAnimals, setAvailableAnimals] = useState<Animal[]>([])
	const { handleContact } = useContact()
	const [selectedIndex, setSelectedIndex] = useState(0)

	useEffect(() => {
		if (animals && animals.length > 0) {
			const availableAnimals = animals.filter(animal => animal.available)
			const selected = availableAnimals.slice(0, Math.min(8, availableAnimals.length))
			setAvailableAnimals(selected)
		}
	}, [animals])

	const autoplayOptions = {
		delay: 8000,
		stopOnMouseEnter: true,
		playOnInit: true,
		rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
	}

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			skipSnaps: false,
			dragFree: false,
		},
		[Autoplay(autoplayOptions)],
	)

	const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } = useAutoplay(emblaApi)

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return

		emblaApi.on("select", () => {
			setSelectedIndex(emblaApi.selectedScrollSnap())
		})

		return () => {
			if (emblaApi) {
				const autoplayPlugin = emblaApi.plugins().autoplay
				if (autoplayPlugin) autoplayPlugin.stop()
			}
		}
	}, [emblaApi])

	if (!isLoading && (!availableAnimals || availableAnimals.length === 0)) {
		return null
	}

	return (
		<section id="animals">
			<h2 className="text-heading-section text-pretty">
				Conheça alguns dos <br /> nossos <span className="text-red-500">animais</span>
			</h2>

			<div className="flex items-end justify-end mb-4">
				<Button
					onClick={toggleAutoplay}
					variant="outline"
					size="icon"
					className="bg-red-500 text-white backdrop-blur-sm"
				>
					{autoplayIsPlaying ? (
						<PauseIcon className="h-4 w-4" />
					) : (
						<PlayIcon className="h-4 w-4" />
					)}
				</Button>
			</div>

			<div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
				<div className="w-full lg:col-span-3 space-y-8 order-2 lg:order-1 flex flex-col justify-center items-center lg:gap-14 gap-4  ">
					<div className="px-4 hidden">
						<p className="animals-card-title flex items-center mb-6 gap-5">
							<Image
								width={50}
								height={50}
								src="/landing/animals/paw-icon.svg"
								alt="Ícone pata"
							/>
							Apadrinhar
						</p>
						<p className="text-pretty text-sm mt-2">
							Uma opção válida para aqueles que não podem adotar, mas desejam ajudar
							de alguma forma. O apadrinhamento é o apoio financeiro com o qual você
							contribui para melhorar a vida do animalzinho.
						</p>
					</div>
					<div className="lg:mt-8 px-4">
						<p className="animals-card-title flex items-center mb-6 gap-5 text-xl">
							<Image
								width={50}
								height={50}
								src="/landing/animals/paw-icon.svg"
								alt="Ícone pata"
							/>
							Adotar
						</p>
						<p className="text-pretty text-sm mt-2 text-md" >
							Adotar significa levar para casa um novo integrante, dando um espaço em
							seu lar e um lugar em seu coração. O animal se torna completamente seu,
							com o abrigo dele se tornando o seu abrigo.
						</p>
					</div>
				</div>

				<div className="w-full lg:col-span-9 space-y-4 order-1 lg:order-2">
					<div className="relative">
						<When
							condition={isLoading}
							fallback={
								<div className="overflow-hidden" ref={emblaRef}>
									<div className="flex lg:h-[645px] h-[350px]">
										{availableAnimals?.map((animal, index) => (
											<div
												key={`${animal.name}-${index}`}
												className="flex-[0_0_auto] mx-4 relative mt-auto"
											>
												<div className="relative group overflow-visible">
													<div
														className={`relative transition-all duration-1000 delay-500 ${
															index === selectedIndex
																? "lg:w-[645px] w-[350px] !lg:text-[32px] text-[20px] aspect-square"
																: "lg:w-[500px] w-[300px] !lg:text-[28px] text-[16px] aspect-square"
														}`}
														style={{
															zIndex:
																index === selectedIndex ? 10 : 0,
														}}
													>
														<Image
															src={
																animal.photo ||
																"/landing/animals/default-animal.png"
															}
															alt={animal.name}
															fill
															className="object-cover rounded-xl"
														/>
														<div className="absolute bottom-0 left-0 right-0 bg-[#18181b80] p-4 rounded-lg mb-6 mx-5">
															<p className="animal-img-title">
																{animal.name}
															</p>
															<div className="flex items-center gap-2 mt-1 text-sm text-zinc-200">
																<span>{getAge(new Timestamp(animal.birthDate?.seconds || 0, animal.birthDate?.nanoseconds || 0).toDate(), true)}</span>
															</div>
															{animal.observations && (
																<p className="text-xs text-zinc-300 mt-1 line-clamp-2">
																	{animal.observations}
																</p>
															)}
															<div className="flex flex-wrap gap-2 mt-3">
																{animal.available && (
																	<Button
																		className="rounded-[20px] lg:px-7 lg:py-2 p-4"
																		size="sm"
																		onClick={() =>
																			handleContact({
																				animal,
																			})
																		}
																	>
																		ADOTAR
																		<ArrowRight
																			className="ml-2 hidden lg:block"
																			size={16}
																		/>
																	</Button>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							}
						>
							<div className="flex lg:h-[645px] h-[350px]">
								{[1, 2, 3].map(item => (
									<AnimalSkeleton key={item} />
								))}
							</div>
						</When>

						{/* Navigation Controls */}
						{!isLoading && !autoplayIsPlaying && (
							<>
								<button
									type="button"
									className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hidden md:block"
									onClick={() => onAutoplayButtonClick(scrollPrev)}
								>
									<ChevronLeftIcon className="h-6 w-6" />
								</button>
								<button
									type="button"
									className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hidden md:block"
									onClick={() => onAutoplayButtonClick(scrollNext)}
								>
									<ChevronRightIcon className="h-6 w-6" />
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}

export default MeetAnimals
