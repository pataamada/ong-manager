import {
	type UpdateEventFormValues,
	updateEventSchema,
} from "@/app/(main)/schedules/_components/modals/create-event/schemas"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { When } from "@/components/when"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import type { Event } from "@/models/event.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { useUpdateEvent } from "../../mutations/useEvents"

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
									onRemoveImage={() => form.setValue("image", null)}
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
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<span className="flex w-full justify-start items-center">
												<When
													condition={field.value}
													fallback={
														<span className="mr-auto">
															Selecionar Data
														</span>
													}
												>
													<span className="mr-auto">
														{format(field.value || new Date(), "PPP", {
															locale: ptBR,
														})}
													</span>
												</When>
												<CalendarIcon className="h-4 w-4 opacity-50" />
											</span>
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={
											typeof field.value === "string"
												? new Date(field.value)
												: field.value
										}
										onSelect={date => field.onChange(date?.toISOString() ?? "")}
										disabled={date => {
											const today = new Date()
											today.setHours(0, 0, 0, 0)
											return date < today
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
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
