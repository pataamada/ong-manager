import type { ReactNode } from "react"

export interface ICard {
	children: ReactNode
	title: string
	subtitle: string
	className?: string
	textColor?: string
	showButton?: boolean
	textPosition?: "top" | "bottom"
	childrenPosition?: "top" | "bottom"
}
