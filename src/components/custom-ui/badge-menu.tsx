import * as React from "react"
// import { cn } from "@/lib/utils"
import { Badge, type BadgeProps } from "../ui/badge"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuRadioGroup,
} from "../ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BadgeMenuItem {
	value: string
	title: string
	description?: string
}
export interface BadgeMenuProps extends BadgeProps {
	options?: BadgeMenuItem[]
	title?: string
	value?: string
	readonly?: boolean
	onValueChange?: (value: string) => void
}

const BadgeMenu = ({
	title = "Selecione algo",
	options = [],
	value,
	onValueChange,
	className,
	readonly = false,
	...props
}: BadgeMenuProps) => {
	const selectedValue = options.find(option => option.value === value)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={readonly}>
				<Badge
					variant="outline"
					tabIndex={0}
					className={cn(
						"cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						className,
					)}
					{...props}
				>
					{selectedValue?.title || title}
					{!readonly && <ChevronDown size={16} />}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-72" aria-readonly={readonly}>
				<DropdownMenuLabel>{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
					{options.map(option => (
						<DropdownMenuRadioItem key={option.value} value={option.value}>
							<div className="flex flex-col">
								<h6 className="text-sm font-bold">{option.title}</h6>
								{option.description && <span className="text-gray-500">{option.description}</span>}
							</div>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

BadgeMenu.displayName = "BadgeMenu"

export { BadgeMenu }
