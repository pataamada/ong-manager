"use client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus } from "lucide-react"
import { EventForm } from "./event-form"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"

export function CreateEventModal() {
	const [open, setOpen] = useState(false)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button>
					<Plus className="mr-2 size-4" /> Novo evento
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-bold">Novo Evento</AlertDialogTitle>
				</AlertDialogHeader>
                <AlertDialogDescription className="sr-only">Criar novo evento</AlertDialogDescription>
				<EventForm setOpen={setOpen} />
			</AlertDialogContent>
		</AlertDialog>
	)
}
