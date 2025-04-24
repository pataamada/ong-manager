import {
	type UpdateEventFormValues,
	updateEventSchema,
} from "@/app/(main)/schedules/_components/modals/create-event/schemas"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import type { Event } from "@/models/event.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUpdateEvent } from "../../mutations/useEvents"
import { DateTimePicker } from "@/components/custom-ui/date-time-picker"

export function UpdateEventForm({
	data,
	onSuccess,
}: { data: AtLeast<Event, "id">; onSuccess: (value: boolean) => void }) {
	const { isPending, mutateAsync } = useUpdateEvent()
	const { user } = useAuth()
	const form = useForm<UpdateEventFormValues>({
		resolver: zodResolver(updateEventSchema),
		defaultValues: {
			title: data.title,
			description: data.description,
			date: data.date,
			image: data.image,
		},
	})

	const onSubmit = async (values: UpdateEventFormValues) => {
		await mutateAsync({
			id: data.id,
			updatedBy: user?.user.displayName || "",
			...values,
		})
		onSuccess(false)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 pt-4">
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<ImageUpload
									value={field.value}
									onChange={field.onChange}
									isUpdating={true}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex gap-1">
								<span className="text-red-500">*</span>
								Título
							</FormLabel>
							<FormControl>
								<Input placeholder="Digite o nome completo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="flex gap-1">
								<span className="text-red-500">*</span>
								Data do evento
							</FormLabel>
							<DateTimePicker date={field.value} {...field} />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Descreva do que se trata a despesa.."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end gap-2">
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							form.reset()
							onSuccess(false)
						}}
					>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Atualizando..." : "Atualizar"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
