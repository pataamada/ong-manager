import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
	type EventFormValues,
	eventSchema,
} from "@/app/(main)/schedules/_components/modals/create-event/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { When } from "@/components/when"
import { useCreateEvent } from "../../mutations/useEvents"
import { useAuth } from "@/hooks/use-auth"

export function CreateEventForm({ setOpen }: { setOpen: (value: boolean) => void }) {
	const { isPending, mutateAsync } = useCreateEvent()
	const { user } = useAuth()
	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	})

	const onSubmit = async (data: EventFormValues) => {
		await mutateAsync({ ...data, updatedBy: user?.user.displayName || "" })
		setOpen(false)
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
								<ImageUpload value={field.value} onChange={field.onChange} />
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
													fallback={<span className="mr-auto">Selecionar Data</span>}
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
										selected={new Date(field.value)}
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
							setOpen(false)
						}}
					>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? "Criando..." : "Criar"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
