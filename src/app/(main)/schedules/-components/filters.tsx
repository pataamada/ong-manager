"use client"
import { CustomSelect } from "@/components/custom-ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"
import { useMemo } from "react"

export function Filters() {
	const sorts = useMemo(
		() => [
			{ value: "mais-recente", label: "Mais recente" },
			{ value: "mais-antigo", label: "Mais antigo" },
		],
		[],
	)
	return (
		<div className="flex gap-2 w-full h-fit justify-end">
			<Input placeholder="Pesquisar..." className="!w-[200px] hidden lg:block" />
			<CustomSelect
				options={sorts}
				placeholder="Ordernar por..."
				label="Ordernar por"
				className="!w-[200px] hidden lg:flex"
				onChange={() => {}}
			/>
			<Button size="icon" variant="outline" className="lg:hidden">
				<Filter size={16} />
			</Button>
		</div>
	)
}
