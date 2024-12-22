import { ImageUpload } from "@/components/custom-ui/image-upload"
import { MultiSelect } from "@/components/custom-ui/multiple-select"
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
import type { News } from "@/models/news.model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useUpdateNews } from "../../mutations/useNews"
import { type UpdateNewsSchema, updateNewsSchema } from "./schemas"

export function NewsUpdateForm({
	data,
	onSuccess,
}: { data: AtLeast<News, "id">; onSuccess?: () => void }) {
	const { isPending, mutateAsync } = useUpdateNews()
	const { user } = useAuth()
	const form = useForm<UpdateNewsSchema>({
		resolver: zodResolver(updateNewsSchema),
		defaultValues: {
			title: data.title,
			description: data.description,
			tags: data.tags || [],
			photo: data.photo,
		},
	})

	const onSubmit = async (formData: UpdateNewsSchema) => {
		await mutateAsync({
			id: data.id,
			...formData,
			updatedBy: user?.user.displayName || "",
		})
		form.reset()
		onSuccess?.()
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
								<ImageUpload {...field} isUpdating={true} />
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
									defaultValue={field.value}
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
							onSuccess?.()
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
