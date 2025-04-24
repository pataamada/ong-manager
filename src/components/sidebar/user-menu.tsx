import { getInitials } from "@/utils/get-initials"
import { Icon } from "../icon"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { CornerUpLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "nextjs-toploader/app"

interface UserMenuProps {
	user?: {
		email?: string
		name?: string
		photo?: string
	}
	onLogout?: () => unknown
	className?: string
	side?: "right" | "left" | "bottom" | "top"
}
export function UserMenu({
	user = {
		email: "Minha conta",
		name: "",
		photo: "",
	},
	side = "right",
	onLogout,
	className,
}: UserMenuProps) {
	const { push} = useRouter()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn("select-none rounded-full", className)}>
				<Avatar className="select-none">
					<AvatarImage src={user.photo} />
					<AvatarFallback>
						<Icon name="User" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent side={side} sideOffset={8} align="start">
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8">
							<AvatarImage src={user.photo} alt={user.name} />
							<AvatarFallback>{getInitials(user.name || "--")}</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs text-muted-foreground">{user.email || "--"}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="gap-2" onClick={() => push("/")}>
						<CornerUpLeft size={16} />
						Página inicial
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="gap-2 text-red-500" onClick={onLogout}>
					<Icon name="DoorOpen" size={16} />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
