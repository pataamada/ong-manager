"use client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CreateEventForm } from "./create-event-form"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { useAtom } from "jotai"
import { modalCreateEvent, updateEventData } from "../../store"
import { UpdateEventForm } from "./update-event-form"

export function CreateEventModal() {
	const [open, setOpen] = useAtom(modalCreateEvent)
	const [data, setData] = useAtom(updateEventData)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-bold">
						{data ? "Editar Evento" : "Criar Evento"}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription className="sr-only">
					{data ? "Editar Evento" : "Criar Evento"}
				</AlertDialogDescription>
				{data ? (
					<UpdateEventForm
						onSuccess={() => {
							setData(null)
							setOpen(false)
						}}
						data={data}
					/>
				) : (
					<CreateEventForm setOpen={setOpen} />
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}
