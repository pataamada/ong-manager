"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import Link, { type LinkProps } from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useSelectedLayoutSegment } from "next/navigation"
import { type IconName, Icon } from "../icon"
const sidebarItemVariants = cva(
	"inline-flex items-center gap-4 rounded-md w-fit px-2 py-2 text-base/6 font-medium transition-colors",
	{
		variants: {
			variant: {
				default: "w-full text-foreground hover:bg-zinc-200 active:bg-black-700",
				select: "w-full text-white bg-primary hover:bg-primary/80 active:bg-primary/70",
			},
			size: {
				default: "",
				icon: "w-10 h-10",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
)

export interface SidebarItemProps
	extends React.HTMLAttributes<HTMLAnchorElement>,
		LinkProps,
		VariantProps<typeof sidebarItemVariants> {
	icon: IconName
	title?: string
	mobile?: boolean
	tooltipSide?: "right" | "top" | "bottom" | "left"
}

function SidebarItem({
	className,
	href,
	icon,
	title,
	variant,
	tooltipSide = "right",
	size,
	...props
}: SidebarItemProps) {
	const segment = useSelectedLayoutSegment()
	const isActive = href.toString().includes(segment || "")
	const selectedVariant = isActive ? "select" : variant
	return (
		<Tooltip>
			<TooltipTrigger>
				<Link
					href={href}
					className={cn(sidebarItemVariants({ variant: selectedVariant }), className)}
					{...props}
				>
					<Icon name={icon} size={24} />
					{title && size !== "icon" ? <p>{title}</p> : null}
				</Link>
			</TooltipTrigger>
			<TooltipContent side={tooltipSide}>
				<p>{title}</p>
			</TooltipContent>
		</Tooltip>
	)
}

export { SidebarItem, sidebarItemVariants }
