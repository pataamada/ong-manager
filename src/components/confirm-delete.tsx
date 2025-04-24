"use client"
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { AlertDialogProps } from "@radix-ui/react-alert-dialog"
import Image from "next/image"
import type { ReactNode } from "react"

interface ConfirmDeleteUserAlertProps extends AlertDialogProps {
	title?: string
	description?: string
	children?: ReactNode
	onSubmit?: () => unknown | Promise<unknown>
	loading?: boolean
}
export function ConfirmDeleteAlert({
	title,
	description,
	children,
	onSubmit,
	loading,
	...props
}: ConfirmDeleteUserAlertProps) {
	return (
		<AlertDialog {...props}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="flex items-center">
					<Image
						color="#fff"
						height={96}
						width={96}
						alt="delete-image"
						src={"delete-image.svg"}
					/>
					<AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
					<AlertDialogDescription className="text-center text-md">
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button onClick={onSubmit} disabled={loading} variant={"destructive"}>
						{loading ? "Apagando..." : "Excluir"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
