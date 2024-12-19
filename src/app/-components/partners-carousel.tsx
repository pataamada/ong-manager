"use client"

import { Pause, Play } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function PartnersCarousel() {
	const [isPaused, setIsPaused] = useState(false)

	const partners = [
		{ name: "CASI", image: "/landing/partners/casi.svg" },
		{ name: "QIF", image: "/landing/partners/qif.svg" },
		{ name: "Ifal Maceió", image: "/landing/partners/ifalwhite.svg" },
	]

	const background = [{ name: "Background 1", image: "/landing/partners/background.svg" }]

	const duplicatedPartners = [...partners, ...partners]

	return (
		<div className="relative -mt-12">
			<button
				type="button"
				onClick={() => setIsPaused(!isPaused)}
				className="pause-button absolute left-4 -top-4 z-10"
				aria-label={isPaused ? "Resume animation" : "Pause animation"}
			>
				{isPaused ? (
					<Play size={16} fill="white" color="white" />
				) : (
					<Pause size={16} fill="white" color="white" />
				)}
			</button>
			<div className="relative w-full h-[130px]">
				<div className="absolute w-full h-full">
					<Image
						src={background[0].image}
						alt="Red background"
						width={1925}
						height={120}
						className="w-full h-full object-cover scale-115"
					/>
				</div>
				<div className="absolute inset-0 flex items-center overflow-hidden">
					<div className="w-full bg-red-500 py-4 linear-gradient">
						<div className={`partners-scroll ${isPaused ? "paused" : ""}`}>
							{duplicatedPartners.map((partner, index) => (
								<div key={`group-${partner.name}-${index}`} className="flex items-center">
									<div className="flex flex-col items-center justify-center mx-8">
										<Image
											src={partner.image}
											alt={partner.name}
											width={80}
											height={20}
											className="filter brightness-0 invert"
										/>
									</div>
									{index < duplicatedPartners.length - 1 && (
										<Image
											src="/landing/partners/minipaw.svg"
											alt="Paw Print"
											width={25}
											height={20}
											className="mx-4 filter brightness-0 invert"
										/>
									)}
								</div>
							))}
							{duplicatedPartners.map((partner, index) => (
								<div key={`group-second-${partner.name}-${index}`} className="flex items-center">
									<div className="flex flex-col items-center justify-center mx-8">
										<Image
											src={partner.image}
											alt={partner.name}
											width={80}
											height={20}
											className="filter brightness-0 invert"
										/>
									</div>
									{index < duplicatedPartners.length - 1 && (
										<Image
											src="/landing/partners/minipaw.svg"
											alt="Paw Print"
											width={25}
											height={20}
											className="mx-4 filter brightness-0 invert"
										/>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
