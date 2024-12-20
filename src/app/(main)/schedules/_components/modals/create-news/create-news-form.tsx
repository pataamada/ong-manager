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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { MultiSelect } from "@/components/custom-ui/multiple-select"
import { type NewsFormValues, newsSchema } from "./schemas"
import { useCreateNews } from "../../mutations/useNews"
import { useAuth } from "@/hooks/use-auth"

export function NewsForm({ setOpen }: { setOpen: (value: boolean) => void }) {
	const { isPending, mutateAsync } = useCreateNews()
	const { user } = useAuth()
	const form = useForm<NewsFormValues>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			title: "",
			description: "",
			tags: [],
		},
	})

	const onSubmit = async (data: NewsFormValues) => {
		await mutateAsync({ ...data, updatedBy: user?.user.displayName || "" })
		form.reset()
		setOpen(false)
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 pt-4">
				<FormField
					control={form.control}
					name="photo"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<ImageUpload {...field} />
							</FormControl>
							<FormMessage />
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
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<span className="text-red-500">*</span> Descrição
							</FormLabel>
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

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="flex gap-1">Categorias</FormLabel>
							<FormControl>
								<MultiSelect
									options={[
										{ value: "dog", label: "Cachorro" },
										{ value: "cat", label: "Gato" },
										{
											value: "imediate",
											label: "Urgência",
										},
									]}
									placeholder="selecionar categorias"
									variant="secondary"
									maxCount={4}
									onValueChange={field.onChange}
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
						{isPending ? "Criando..." : "Criar Noticia"}
					</Button>
				</div>
			</form>
		</Form>
	)
}
