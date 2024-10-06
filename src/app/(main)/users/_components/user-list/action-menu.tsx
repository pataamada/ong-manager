import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit2, Trash } from "lucide-react"

interface ActionMenuProps<T> {
	value: T
	onEditClick?: ((value: T) => unknown) | undefined
	onDeleteClick?: ((value: T) => unknown) | undefined
}
export function ActionMenu<T>({ onEditClick, value, onDeleteClick }: ActionMenuProps<T>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal size={16} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem className="gap-2" onClick={() => onEditClick?.(value)}>
					<Edit2 size={16} />
					<span>Editar</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-2 text-red-500" onClick={() => onDeleteClick?.(value)}>
					<Trash size={16} />
					<span>Apagar</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
