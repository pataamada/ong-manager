"use client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EventForm } from "./event-form"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { useAtom } from "jotai"
import { modalCreateEvent } from "../../store"

export function CreateEventModal() {
	const [open, setOpen] = useAtom(modalCreateEvent)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
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
