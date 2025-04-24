"use client"
import { ListFilters } from "@/components/list-filters"
import { useAtom } from "jotai"
import { filtersAtom } from "./store"

export function AnimalsFilters() {
	const [columnFilters, setColumnFilters] = useAtom(filtersAtom)
	const mapFilters = Object.entries(columnFilters).map(([key, value]) => ({ id: key, value }))
	const handleRemoveFilter = (id: string) => {
		setColumnFilters({ ...columnFilters, [id]: undefined })
	}
	return (
		<ListFilters
			columnFilters={mapFilters}
			filterLabels={{ type: "Tipo", sex: "Sexo", maxAge: "Idade máxima", neutered: "Castrado", available: "Disponível" }}
			onRemoveFilter={handleRemoveFilter}
		/>
	)
}
