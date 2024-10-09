import { Icon } from "../icon"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface UserMenuProps {
	email?: string
	photo?: string
	onLogout?: () => unknown
	className?: string
	side?: "right" | "left" | "bottom" | "top"
}
export function UserMenu({
	email = "Minha conta",
	side = "right",
	onLogout,
	photo,
	className,
}: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={className}>
				<Avatar className="select-none">
					<AvatarImage src={photo} />
					<AvatarFallback>
						<Icon name="User" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={side} sideOffset={8} align="start">
				<DropdownMenuLabel>{email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 text-red-500" onClick={onLogout}>
					<Icon name="DoorOpen" size={16} />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
