"use client"

import { Plus } from "lucide-react"
import { DynamicSelect } from "../DynamicSelect"
import { Button } from "../ui/button"
import { Search } from "../ui/input"

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const sorts = [
	{ value: "mais-recente", label: "Mais recente" },
	{ value: "mais-antigo", label: "Mais antigo" },
	// ...
]

import { useState } from "react"
import { EventForm } from "./EventForm"

export function Filters() {
	const [open, setOpen] = useState(true)

	return (
		<div className="flex gap-4">
			<Search placeholder="Pesquisar..." />
			<DynamicSelect
				options={sorts}
				placeholder="Ordernar por..."
				label="Ordernar por"
				onChange={() => {}}
			/>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button className="bg-black text-sm border-2">
						<Plus className="mr-2 size-4" /> Novo evento
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="text-xl font-bold">Novo Evento</DialogTitle>
					</DialogHeader>
					<EventForm setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		</div>
	)
}
