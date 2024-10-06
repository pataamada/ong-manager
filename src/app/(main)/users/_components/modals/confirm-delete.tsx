import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import Image from "next/image"
import type { ReactNode } from "react"

interface ConfirmDeleteUserAlertProps extends AlertDialogProps {
	children?: ReactNode
	onSubmit?: () => unknown
}
export function ConfirmDeleteUserAlert({
	children,
	onSubmit,
	...props
}: ConfirmDeleteUserAlertProps) {
	return (
		<AlertDialog {...props}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="flex items-center">
					<Image color="#fff" height={96} width={96} alt="delete-image" src={"delete-image.svg"} />
					<AlertDialogTitle>Tem certeza que deseja excluir esse usuário?</AlertDialogTitle>
					<AlertDialogDescription className="text-center">
						Ao excluir o usuário não será possível recuperar as informações relacionadas a ele.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onSubmit}>Excluir</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
