"use client"

import { useToast } from "@/hooks/use-toast"
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast"
import { Suspense } from "react"

export function Toaster() {
	const { toasts } = useToast()

	return (
		<Suspense fallback={null}>
			<ToastProvider>
				{toasts.map(({ id, title, description, action, ...props }) => (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
						{action}
						<ToastClose />
					</Toast>
				))}
				<ToastViewport />
			</ToastProvider>
		</Suspense>
	)
}