import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	type EventFormValues,
	eventSchema,
} from "@/app/(main)/schedules/_components/modals/create-event/event-form-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { CustomSelect } from "@/components/custom-ui/select"

export function NewsForm({ setOpen }: { setOpen: (value: boolean) => void }) {
	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			description: "",
			image: "",
		},
	})

	const onSubmit = (data: EventFormValues) => {
		console.log(data)
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
								Categorias
							</FormLabel>
							<CustomSelect
								options={[
									{ value: "dog", label: "Cachorro" },
									{ value: "cat", label: "Gato" },
									{ value: "imediate", label: "Urgência" },
								]}
								placeholder="Ordernar por..."
								label="Ordernar por"
								className="w-full"
								{...field}
							/>
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
					<Button type="submit">Criar</Button>
				</div>
			</form>
		</Form>
	)
}
