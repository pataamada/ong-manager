import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/custom-ui/drawer"
import { CustomSelect } from "@/components/custom-ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAtom } from "jotai"
import { useMemo, useState } from "react"
import { filterDrawerAtom, filterOrderAtom, filterSearchAtom } from "../store"

export function FilterDrawer() {
	const [open, setOpen] = useAtom(filterDrawerAtom)
	const [searchFilter, setSearchFilter] = useState<string>("")
	const [orderFilter, setOrderFilter] = useState<"newer" | "older">("newer")
	const [orderFilterAtom, setOrderFilterAtom] = useAtom(filterOrderAtom)
	const [searchFilterAtom, setSearchFilterAtom] = useAtom(filterSearchAtom)

	const handleFilterRole = () => {
		setSearchFilterAtom(searchFilter)
		setOrderFilterAtom(orderFilter)
		setOpen(false)
	}

	const handleCleanFilters = () => {
		setSearchFilterAtom("")
		setOrderFilterAtom("newer")
		setOpen(false)
	}

	const sorts = useMemo(
		() => [
			{ value: "newer", label: "Mais recente" },
			{ value: "older", label: "Mais antigo" },
		],
		[],
	)
	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerContent side="right" backgroundOverlay="transparent">
				<DrawerHeader className="flex flex-col gap-4">
					<DrawerTitle>Filtros</DrawerTitle>

					<div>
						<h1 className="mb-2">
							<Label htmlFor="search" className="text-sm font-bold">
								Pesquisar
							</Label>
						</h1>
						<Input
							id="search"
							placeholder="Pesquisar..."
							value={searchFilter}
							defaultValue={searchFilterAtom}
							onChange={e => setSearchFilter(e.target.value)}
						/>
					</div>

					<div>
						<h1 className="mb-2 text-sm font-bold">Ordem</h1>
						<CustomSelect
							options={sorts}
							value={orderFilter}
							defaultValue={orderFilterAtom}
							placeholder="Ordernar por..."
							label="Ordernar por"
							onChange={e => setOrderFilter(e as "older" | "newer")}
						/>
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
