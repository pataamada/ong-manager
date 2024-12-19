import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ToolTip({
	children,
	content,
	className,
	side = "right",
	sideOffset = 16,
}: {
	children: React.ReactNode
	content: React.ReactNode
	className?: string
	side?: "right" | "left" | "top" | "bottom"
	sideOffset?: number
}) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} className={className} sideOffset={sideOffset}>
					{content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
