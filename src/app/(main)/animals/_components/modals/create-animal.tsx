"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useAtom } from "jotai"
import { createAnimalModalAtom } from "../store"
import { AnimalForm } from "./create-update-animal/form"

export function CreateAnimalModal() {
	const [open, setOpen] = useAtom(createAnimalModalAtom)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Animal</DialogTitle>
				</DialogHeader>
				<AnimalForm />
			</DialogContent>
		</Dialog>
	)
}
