"use client"
import { CustomSelect } from "@/components/custom-ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAtom, useSetAtom } from "jotai"
import { Filter } from "lucide-react"
import { useMemo } from "react"
import { filterOrderAtom, filterSearchAtom } from "./store"

export function Filters() {
	const [search, setSearch] = useAtom(filterSearchAtom)
	const setOrder = useSetAtom(filterOrderAtom)
	const sorts = useMemo(
		() => [
			{ value: "newer", label: "Mais recente" },
			{ value: "older", label: "Mais antigo" },
		],
		[],
	)
	return (
		<div className="flex gap-2 w-full h-fit justify-end">
			<Input
				placeholder="Pesquisar..."
				className="!w-[200px] hidden lg:block"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<CustomSelect
				options={sorts}
				placeholder="Ordernar por..."
				label="Ordernar por"
				className="!w-[200px] hidden lg:flex"
				onChange={e => setOrder(e as "older" | "newer")}
			/>
			<Button size="icon" variant="outline" className="lg:hidden">
				<Filter size={16} />
			</Button>
		</div>
	)
}
