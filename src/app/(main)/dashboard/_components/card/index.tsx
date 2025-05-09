import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

interface ICard {
	children: ReactNode
	title: string
	subtitle: string
	className?: string
	textColor?: string
	redirectTo?: string
	textPosition?: "top" | "bottom"
	childrenPosition?: "top" | "bottom"
}

export function Card({
	children,
	title,
	subtitle,
	className,
	textColor = "text-black",
	redirectTo,
	textPosition = "top",
	childrenPosition = "bottom",
}: ICard) {
	return (
		<div
			className={clsx([
				"bg-card p-4 sm:p-6 rounded-lg shadow flex flex-col gap-2",
				className,
			])}
		>
			<div
				className={clsx([
					"flex align-top justify-between",
					{
						"order-2": childrenPosition === "top",
					},
				])}
			>
				<div
					className={clsx("flex flex-col", {
						"flex-col-reverse": textPosition === "top",
						"flex-col": textPosition === "bottom",
					})}
				>
					<h1 className={clsx("text-2xl font-bold", textColor)}>{title}</h1>
					<h2 className="text-base font-normal">{subtitle}</h2>
				</div>

				{redirectTo && (
					<Link href={redirectTo}>
						<Button
							variant="link"
							className="bg-foreground text-white font-normal flex items-center gap-2 p-2 sm:p-4"
						>
							<span className="hidden sm:flex">Ver completo</span>
							<Image
								src={"/dashboard/arrow-icon.svg"}
								width={20}
								height={20}
								alt="ícone de botão"
							/>
						</Button>
					</Link>
				)}
			</div>

			<div
				className={clsx({
					"order-1": childrenPosition === "top",
					"order-2": childrenPosition === "bottom",
				})}
			>
				{children}
			</div>
		</div>
	)
}
