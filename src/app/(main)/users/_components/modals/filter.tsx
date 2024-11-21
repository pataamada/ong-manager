import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/custom-ui/drawer"
import { Button } from "@/components/ui/button"
import { useAtom, useSetAtom } from "jotai"
import { filterAtom, filterDrawerAtom } from "../filters"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { UserRoles } from "@/models/user.model"
export function FilterDrawer() {
	const [open, setOpen] = useAtom(filterDrawerAtom)
	const setFilter = useSetAtom(filterAtom)
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent side="right" backgroundOverlay="transparent">
				<DrawerHeader className="flex flex-col gap-4">
					<DrawerTitle className="text-md">Filtros</DrawerTitle>
				
					<div>
						<h1 className="mb-2">
                            <span className="text-sm font-bold text-red-500">* </span>
                            <span className="text-sm font-bold">Cargo</span>
                        </h1>
						<Select onValueChange={value => setFilter({ role: value as UserRoles })}>
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
					<Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
					<Button variant="default">Filtrar</Button>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
