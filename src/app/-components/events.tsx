"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Image from "next/image"
import { useGetEvents } from "@/app/(main)/schedules/_components/mutations/useEvents"
import { When } from "@/components/when"
import { Skeleton } from "@/components/ui/skeleton"

export interface Event {
	id: string
	title: string
	description: string
	date: string
	image?: string
	updatedBy: string
}

const formatDate = (date: string) => {
	const month = new Date(date).toLocaleString("pt-BR", { month: "long" })
	const day = new Date(date).getDate()
	const time = new Date(date).toLocaleString("pt-BR", {
		hour: "numeric",
		minute: "numeric",
	})
	return { month, day, time }
}

const EventSkeleton = () => {
	return (
		<div className="bg-white border rounded-lg min-h-[350px] w-[640px] h-full max-w-full select-none text-pretty flex sm:flex-row flex-col-reverse">
			<div className="md:p-6 p-2 px-6 pr-0 flex items-center sm:justify-center sm:flex-col text-zinc-500 gap-2">
				<span className="flex flex-row-reverse sm:flex-col text-center gap-2">
					<Skeleton className="h-8 w-20 sm:h-10" />
					<Skeleton className="h-12 w-16 sm:h-20 sm:w-20" />
				</span>
				<Skeleton className="h-8 w-16 sm:h-10" />
			</div>
			<div className="md:p-5 p-2 px-6 flex-1">
				<Skeleton className="w-full rounded-lg h-[180px]" />
				<Skeleton className="h-10 w-full mt-4" />
				<Skeleton className="h-12 w-full mt-2" />
			</div>
		</div>
	)
}

const EventSkeletonList = () => {
	return (
		<Carousel>
			<CarouselContent className="-ml-6">
				{[1, 2, 3].map((item) => (
					<CarouselItem className="pl-6 lg:basis-[45%] md:basis-2/3 basis-10/12" key={item}>
						<EventSkeleton />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	)
}

export default function Events() {
	const { data: events, isLoading } = useGetEvents()

	return (
		<section id="events" className="lg:pt-[128px] pt-[64px]">
			<h2 className="text-h2 text-zinc-800 mb-6 text-center">Eventos</h2>
			<div className="mx-auto px-3">
				<When
					condition={isLoading}
					fallback={
						<When
							condition={events && events.length > 0}
							fallback={
								<p className="text-center text-zinc-500">Nenhum evento encontrado.</p>
							}
						>
							<Carousel>
								<CarouselContent className="-ml-6">
									{events?.map(event => (
										<CarouselItem className="pl-6 lg:basis-[45%] md:basis-2/3 basis-10/12" key={event.id}>
											<div className="bg-white border rounded-lg min-h-[350px] w-[640px] h-full max-w-full select-none text-pretty flex sm:flex-row flex-col-reverse">
												<div className="md:p-6 p-2 px-6 pr-0 flex items-center sm:justify-center sm:flex-col text-zinc-500 gap-2">
													<span className="flex flex-row-reverse sm:flex-col text-center gap-2">
														<p className="capitalize text-subtitle-2">{formatDate(event.date).month}</p>
														<p className="sm:text-[3.25rem] sm:font-bold sm:text-zinc-800 sm:leading-[60px] text-subtitle-2">
															{formatDate(event.date).day}
														</p>
													</span>
													<p className="sm:text-[1.75rem] leading-[36px] text-subtitle-2">
														{formatDate(event.date).time}
													</p>
												</div>
												<div className="md:p-5 p-2 px-6 flex-1">
													<div className="w-full rounded-lg h-[180px] relative">
														<Image
															src={event.image || "/landing/default-banner.svg"}
															alt={event.title}
															className="object-cover rounded-lg"
															fill
														/>
													</div>
													<p className="text-subtitle-2 font-bold my-2 line-clamp-2 min-h-[56px] sm:min-h-0">
														{event.title}
													</p>
													<p className="text-paragraph text-zinc-600 line-clamp-2 min-h-[48px] sm:min-h-0">
														{event.description}
													</p>
												</div>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</When>
					}
				>
					<EventSkeletonList />
				</When>
			</div>
		</section>
	)
}
