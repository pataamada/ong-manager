"use client"
import { CustomSelect } from "@/components/custom-ui/select"
import { Input } from "@/components/ui/input"

import { useLayoutEffect, useMemo } from "react"

export function Filters() {
	const sorts = useMemo(
		() => [
			{ value: "mais-recente", label: "Mais recente" },
			{ value: "mais-antigo", label: "Mais antigo" },
		],
		[],
	)
	useLayoutEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth
			if (width < 768) {
				return
			}
			const inputs = document.querySelectorAll("input")
			inputs.forEach(input => {
				input.classList.remove("!w-[200px]")
			})
		}
		handleResize()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	})
	return (
		<div className="flex gap-2 w-full h-fit justify-end">
			<Input placeholder="Pesquisar..." className="!w-[200px]"/>
			<CustomSelect
				options={sorts}
				placeholder="Ordernar por..."
				label="Ordernar por"
				className="!w-[200px]"
				onChange={() => {}}
			/>
		</div>
	)
}
