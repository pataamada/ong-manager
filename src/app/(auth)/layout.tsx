import Image from "next/image"
import type { ReactNode } from "react"





export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<div className="relative flex flex-col items-start lg:items-center  h-screen lg:flex-row">
			<div className="relative bg-red-400">
			<Image
					src="/auth/firefly_happy_person_with_dogs.svg"
					alt="logo"
					className="hidden lg:block h-screen w-screen object-cover lg:w-full"
					width={1920}
					height={1080}
				/>
				<Image
					src="/auth/logo_transparent.svg"
					alt="logo"
					className="hidden w-1/4 lg:block lg:w-fit absolute top-5 left-5 lg:top-10 lg:left-10 "
					width={500}
					height={200}
				/>
				<Image
					src="/auth/left_paws_group.svg"
					alt="left_paws_group"
					className="absolute w-1/4 lg:w-fit opacity-90 bottom-0 left-0 mix-blend-multiply"
					width={500}
					height={500}
				/>
				<Image
					src="/auth/right_paws_group.svg"
					alt="right_paws_group"
					className="absolute w-1/4 lg:w-fit opacity-90 bottom-0 right-0 mix-blend-multiply"
					width={500}
					height={500}
				/>
			</div>

			<div className="absolute lg:static top-1/2 lg:top-auto left-1/2 lg:left-auto -translate-x-1/2 lg:-translate-x-0 -translate-y-1/2 lg:-translate-y-0 flex w-full rounded-lg h-full flex-col lg:mx-16 lg:w-2/6  justify-center gap-4 pt-[135px] min-w-[360px] items-center">
				<Image src="/logo_black.svg" alt="logo_black" className="absolute top-[50px]" width={200} height={100} />
				{children}
			</div>
		</div>
	)
}
