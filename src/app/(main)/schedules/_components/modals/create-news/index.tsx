"use client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { NewsForm } from "./news-form"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { useAtom } from "jotai"
import { createNewsModal } from "../../store"

export function CreateNewsModal() {
	const [open, setOpen] = useAtom(createNewsModal)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-bold">Nova Notícia</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription className="sr-only">Criar novas notícias</AlertDialogDescription>
				<NewsForm setOpen={setOpen} />
			</AlertDialogContent>
		</AlertDialog>
	)
}
