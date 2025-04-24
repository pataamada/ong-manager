"use client"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/custom-ui/drawer"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useAtom } from "jotai"
import { filterDrawerAtom, filtersAtom, type FilterType } from "../store"
import { useEffect, useState } from "react"
import { AnimalSex, AnimalType } from "@/models/animal.model"

export function FilterDrawer() {
	const [open, setOpen] = useAtom(filterDrawerAtom)
	const [filters, setFilters] = useAtom(filtersAtom)
	const [localFilters, setLocalFilters] = useState<FilterType>({})
	const handleApplyFilters = () => {
		setFilters(localFilters)
		setOpen(false)
	}
	const handleClearFilters = () => {
		setFilters({})
		setOpen(false)
	}
	useEffect(() => {
		setLocalFilters(filters)
	}, [filters])
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent side="right">
				<DrawerHeader className="flex flex-col gap-4">
					<DrawerTitle>Filtros</DrawerTitle>
					<div className="space-y-4">
						<div>
							<h1 className="mb-2">
								<span className="text-sm font-semibold">Tipo</span>
							</h1>
							<Select
								value={localFilters.type}
								onValueChange={type => setLocalFilters({ ...localFilters, type })}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecionar tipo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={AnimalType.Cat}>Gato</SelectItem>
									<SelectItem value={AnimalType.Dog}>Cachorro</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<h1 className="mb-2">
								<span className="text-sm font-semibold">Sexo</span>
							</h1>
							<Select
								value={localFilters.sex}
								onValueChange={sex => setLocalFilters({ ...localFilters, sex })}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecionar sexo" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={AnimalSex.M}>Macho</SelectItem>
									<SelectItem value={AnimalSex.F}>Fêmea</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<h1 className="mb-2">
								<span className="text-sm font-semibold">Idade máxima</span>
							</h1>
							<Input
								type="number"
								value={localFilters.maxAge}
								onChange={e =>
									setLocalFilters({
										...localFilters,
										maxAge: Number(e.target.value),
									})
								}
								placeholder="Ex.: 2"
							/>
						</div>

						<div className="flex items-center gap-2">
							<Switch
								checked={localFilters.available}
								onCheckedChange={available =>
									setLocalFilters({
										...localFilters,
										available,
									})
								}
							/>
							<h1 className="mb-2">
								<span className="text-sm font-semibold">Disponível</span>
							</h1>
						</div>

						<div className="flex items-center gap-2">
							<Switch
								checked={localFilters.neutered}
								onCheckedChange={neutered =>
									setLocalFilters({
										...localFilters,
										neutered,
									})
								}
							/>
							<h1 className="mb-2">
								<span className="text-sm font-semibold">Castrado</span>
							</h1>
						</div>
					</div>
				</DrawerHeader>

				<div className="flex justify-end gap-2 mt-auto">
					<Button variant="outline" onClick={handleClearFilters}>
						Limpar
					</Button>
					<Button variant="default" onClick={handleApplyFilters}>
						Filtrar
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
