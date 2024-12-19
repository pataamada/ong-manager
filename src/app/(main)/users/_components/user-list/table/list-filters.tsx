import type { ColumnFiltersState } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export const filterLabels: Record<string, string> = {
	user: "Usuário",
	role: "Cargo",
	uuid: "ID",
}

interface ListFiltersProps {
	columnFilters: ColumnFiltersState
    onRemoveFilter?: (id: string) => void
}

export function ListFilters({ columnFilters, onRemoveFilter }: ListFiltersProps) {
	if (columnFilters.length === 0) return null
	return (
		<div className="flex items-center gap-2">
			{columnFilters
				.filter(filter => filter.value)
				.map(filter => (
					<Badge key={filter.id} variant="secondary">
						<span>{filterLabels[filter.id] || filter.id}</span>
                        <X className="ml-2 w-4 h-4 cursor-pointer" onClick={() => onRemoveFilter?.(filter.id)}/>
					</Badge>
				))}
		</div>
	)
}
