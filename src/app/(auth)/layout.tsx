import Image from "next/image"
import fireflyHappyPersonWithDogs from "@/assets/images/firefly_happy_person_with_dogs.svg"
import leftPawsGroup from "@/assets/images/left_paws_group.svg"
import logoTransparent from "@/assets/images/logo_transparent.svg"
import rightPawsGroup from "@/assets/images/right_paws_group.svg"

import logoBlack from "@/assets/images/logo_black.svg"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<section className="relative flex flex-col items-start lg:items-center  h-screen lg:flex-row">
			<div className="relative bg-red-400">
				<Image
					src={fireflyHappyPersonWithDogs}
					alt="logo"
					className="hidden lg:block h-screen w-screen object-cover lg:w-full"
				/>
				<Image
					src={logoTransparent}
					alt="logo"
					className="hidden w-1/4 lg:block lg:w-fit absolute top-5 left-5 lg:top-10 lg:left-10 "
				/>
				<Image
					src={leftPawsGroup}
					alt="left_paws_group"
					className="absolute w-1/4 lg:w-fit opacity-90 bottom-0 left-0 mix-blend-multiply"
				/>
				<Image
					src={rightPawsGroup}
					alt="right_paws_group"
					className="absolute w-1/4 lg:w-fit opacity-90 bottom-0 right-0 mix-blend-multiply"
				/>
			</div>
			<div className="absolute lg:static top-1/2 lg:top-auto left-1/2 lg:left-auto -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 lg:-translate-y-0 flex w-full rounded-lg h-full flex-col lg:mx-16 lg:w-2/6  justify-center gap-4 pt-[135px] min-w-[360px] items-center">
				<Image src={logoBlack} alt="logo_black" className="absolute top-[50px]" />
				{children}
			</div>
		</section>
	)
}
