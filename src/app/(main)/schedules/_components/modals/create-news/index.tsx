"use client"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { NewsForm } from "./create-news-form"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { useAtom } from "jotai"
import { modalCreateNews, updateNewsData } from "../../store"
import { NewsUpdateForm } from "./update-news-form"

export function CreateNewsModal() {
	const [open, setOpen] = useAtom(modalCreateNews)
	const [data, setData] = useAtom(updateNewsData)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-bold">
						{data ? "Editar Notícias" : "Criar Notícias"}
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription className="sr-only">
					{data ? "Editar Notícias" : "Criar Notícias"}
				</AlertDialogDescription>

				{data ? (
					<NewsUpdateForm
						onSuccess={() => {
							setData(null)
							setOpen(false)
						}}
						data={data}
					/>
				) : (
					<NewsForm setOpen={setOpen} />
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}
