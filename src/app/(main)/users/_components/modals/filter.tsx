import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/custom-ui/drawer"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { filterAtom, filterDrawerAtom } from "../store"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { UserRoles } from "@/models/user.model"
import { useState } from "react"
export function FilterDrawer() {
	const [open, setOpen] = useAtom(filterDrawerAtom)
	const [roleFilter, setRoleFilter] = useState<UserRoles | null>(null)
	const [filters, setFilters] = useAtom(filterAtom)
	const handleFilterRole = () => {
		if (!roleFilter) {
			return
		}
		const hasRoleFilter = filters.find(filter => filter.id === "role")
		if (hasRoleFilter) {
			setFilters(filters =>
				filters.map(filter =>
					filter.id === "role" ? { ...filter, value: roleFilter } : filter,
				),
			)
		} else {
			setFilters(filters => [...filters, { id: "role", value: roleFilter }])
		}

		setOpen(false)
	}
	const handleCleanFilters = () => {
		setFilters(filters => filters.filter(filter => filter.id !== "role"))
		setOpen(false)
	}
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent side="right" backgroundOverlay="transparent">
				<DrawerHeader className="flex flex-col gap-4">
					<DrawerTitle>Filtros</DrawerTitle>

					<div>
						<h1 className="mb-2">
							<span className="text-sm font-bold text-red-500">* </span>
							<span className="text-sm font-bold">Cargo</span>
						</h1>
						<Select
							defaultValue={
								filters.find(filter => filter.id === "role")?.value as UserRoles
							}
							onValueChange={value => setRoleFilter(value as UserRoles)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecionar cargo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={UserRoles.Admin}>Administrador</SelectItem>
								<SelectItem value={UserRoles.Authenticated}>Autenticado</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</DrawerHeader>

				<div className="flex justify-end gap-2 mt-auto">
					<Button variant="outline" onClick={handleCleanFilters}>
						Limpar
					</Button>
					<Button variant="default" onClick={handleFilterRole}>
						Filtrar
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
