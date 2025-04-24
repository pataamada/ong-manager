"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Plus } from "lucide-react"
import { useAtom, useSetAtom } from "jotai"
import {
	createAnimalModalAtom,
	filterDrawerAtom,
	searchFilterAtom,
	updateAnimalInfo,
} from "./store"

export function Header({ isAdmin = true }: { isAdmin?: boolean }) {
	const setFilterDrawerOpen = useSetAtom(filterDrawerAtom)
	const setCreateOpen = useSetAtom(createAnimalModalAtom)
	const [searchValue, setSearchValue] = useAtom(searchFilterAtom)
	const setUpdateInfo = useSetAtom(updateAnimalInfo)

	return (
		<div className="flex items-center gap-2">
			<Input
				placeholder="Pesquise por nome, observações..."
				value={searchValue}
				onChange={event => setSearchValue(event.target.value)}
				className="max-w-sm min-w-[300px] mr-auto"
			/>

			<Button variant="outline" size="icon" onClick={() => setFilterDrawerOpen(true)}>
				<Filter className="h-4 w-4 text-black" />
			</Button>
			{isAdmin && (
				<Button
					onClick={() => {
						setUpdateInfo(null)
						setCreateOpen(true)
					}}
				>
					<Plus className="h-4 w-4 mr-2 text-white" />
					Adicionar
				</Button>
			)}
		</div>
	)
}
