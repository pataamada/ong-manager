import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { CalendarIcon } from "lucide-react"

import { Input } from "../ui/input"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"

import { Calendar } from "../ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import { type EventFormValues, eventSchema } from "@/app/(main)/schedules/eventFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"

export function EventForm({ setOpen }: { setOpen: (value: boolean) => void }) {
	const form = useForm<EventFormValues>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			date: "",
			description: "",
			image: "",
		},
	})

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				form.setValue("image", reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const onSubmit = (data: EventFormValues) => {
		console.log(data)
		// Aqui você pode adicionar a lógica para enviar os dados para o servidor
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
								<div className="relative">
									<Input
										type="file"
										accept="image/*"
										onChange={handleImageUpload}
										className="hidden"
										id="image-upload"
									/>
									<Label
										htmlFor="image-upload"
										className={cn(
											"flex h-[200px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-200 transition-colors hover:border-gray-300",
											field.value && "border-none",
										)}
									>
										{field.value ? (
											<Image
												src={field.value}
												alt="Preview"
												layout="fill"
												objectFit="contain"
												className="rounded-lg bg-black"
											/>
										) : (
											<span className="text-3xl text-gray-400">+</span>
										)}
									</Label>
								</div>
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
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
											{field.value ? (
												format(field.value, "PPP", {
													locale: ptBR,
												})
											) : (
												<span className="mr-auto">Selecionar Data</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={new Date(field.value)}
										onSelect={date => field.onChange(date?.toISOString() ?? "")}
										disabled={date => date > new Date() || date < new Date("1900-01-01")}
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
				<div className="flex justify-end gap-4">
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
					<Button className="bg-black" type="submit">
						Criar
					</Button>
				</div>
			</form>
		</Form>
	)
}
