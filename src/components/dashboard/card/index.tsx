import btnIcon from "@/assets/images/dashboard/arrow-icon.svg"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Image from "next/image"
import type { ICard } from "./types"

export function Card({
	children,
	title,
	subtitle,
	className,
	textColor = "text-black",
	showButton = false,
	textPosition = "top",
	childrenPosition = "bottom",
}: ICard) {
	return (
		<div className={clsx(["bg-card p-6 rounded-lg shadow flex flex-col gap-2", className])}>
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

				{showButton && (
					<Button
						variant="link"
						className="bg-foreground text-white font-normal flex items-center gap-2"
					>
						Ver completo
						<Image src={btnIcon} alt="Icon of button" />
					</Button>
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
