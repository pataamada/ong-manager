"use client"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/custom-ui/image-upload"
import { useAtom } from "jotai"
import { AnimalSex, AnimalType } from "@/models/animal.model"
import { useAuth } from "@/hooks/use-auth"
import { createAnimalModalAtom, updateAnimalInfo } from "../../store"
import { useCreateAnimal, useUpdateAnimal } from "../../mutations"
import { Step } from "../../step"
import { When } from "@/components/when"

const steps = {
	info: [
		{ step: 1, label: "Geral" },
		{ step: 2, label: "Especificas" },
	],
}

const Step1CreateModalSchema = z.object({
	name: z.string().min(2, "Mínimo de 2 caracteres"),
	age: z.string({ message: "Idade é obrigatória" }).refine(value => !/[^0-9]/g.test(value), {
		message: "Apenas valores inteiros são permitidos",
	}),
	observations: z.string().optional(),
	image: z.union(
		[
			z
				.instanceof(File, { message: "Imagem é obrigatória" })
				.refine(file => file.size < 2 * 1024 * 1024, "File size must be less than 2MB")
				.optional(),
			z.string().optional(),
		],
		{
			message: "Imagem é obrigatória",
		},
	),
})

const Step2CreateModalSchema = z.object({
	type: z.nativeEnum(AnimalType, {
		message: "Por favor, selecione o tipo do animal",
	}),
	sex: z.nativeEnum(AnimalSex, {
		message: "Por favor, selecione o sexo do animal",
	}),
	castration: z.boolean().optional(),
	available: z.boolean().optional(),
})

export function AnimalForm() {
	const [step, setStep] = useState(1)
	const { user } = useAuth()
	const [open, setOpen] = useAtom(createAnimalModalAtom)
	const [data] = useAtom(updateAnimalInfo)
	const { mutateAsync: createAnimal, isPending: isCreatePending } = useCreateAnimal()
	const { mutateAsync: updateAnimal, isPending: isUpdatePending } = useUpdateAnimal()
	const formStep1CreateModalSchema = useForm<z.infer<typeof Step1CreateModalSchema>>({
		resolver: zodResolver(Step1CreateModalSchema),
		defaultValues: {
			name: data?.name || "",
			age: String(data?.age || ""),
			observations: data?.observations || "",
			image: data?.photo,
		},
	})

	const formStep2CreateModalSchema = useForm<z.infer<typeof Step2CreateModalSchema>>({
		resolver: zodResolver(Step2CreateModalSchema),
		defaultValues: {
			type: data?.type,
			sex: data?.sex,
			castration: data?.castration,
			available: data?.avaliable,
		},
	})

	const onSubmit = async () => {
		const formData = {
			...formStep1CreateModalSchema.getValues(),
			...formStep2CreateModalSchema.getValues(),
		}
		if (!user?.user.displayName) {
			return
		}
		if (data) {
			await updateAnimal({
				id: data.id,
				updatedBy: user?.user.displayName,
				...formData,
				avaliable: formData.available !== undefined ? formData.available : data.avaliable,
				age: Number(formData.age),
			})
			setOpen(false)
			return
		}
		await createAnimal({
			age: Number(formData.age),
			name: formData.name,
			avaliable: formData.available !== undefined ? formData.available : false,
			castration: formData.castration !== undefined ? formData.castration : false,
			observations: formData.observations || "",
			photo: formData.image instanceof File ? formData.image : undefined,
			sex: formData.sex,
			type: formData.type,
			updatedBy: user?.user.displayName,
		})
		setOpen(false)
	}

	const handleNext = async () => {
		const isValid =
			step === 1
				? await formStep1CreateModalSchema.trigger()
				: await formStep2CreateModalSchema.trigger()

		if (isValid && step < steps.info.length) {
			setStep(prev => prev + 1)
		}
	}

	const handleBack = () => setStep(prev => prev - 1)

	useEffect(() => {
		if (!open) {
			formStep1CreateModalSchema.reset()
			formStep2CreateModalSchema.reset()
			setStep(1)
		}
	}, [open, formStep1CreateModalSchema, formStep2CreateModalSchema])

	return (
		<>
			<div className="flex flex-col">
				<div className="mx-auto mb-10 flex justify-between">
					{steps.info.map(i => (
						<Step
							key={i.step}
							label={i.label}
							step={i.step}
							stepsCount={steps.info.length}
							currentStep={step}
						/>
					))}
				</div>
			</div>

			{step === 1 && (
				<Form {...formStep1CreateModalSchema}>
					<form className="space-y-4">
						<FormField
							control={formStep1CreateModalSchema.control}
							name="image"
							render={({ field }) => (
								<FormItem className="col-span-4 flex items-center justify-center">
									<FormControl>
										<ImageUpload
											height="h-[120px]"
											className="w-[120px]"
											objectFit="cover"
											value={field.value}
											onChange={field.onChange}
											onRemoveImage={() => formStep1CreateModalSchema.setValue("image", undefined)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formStep1CreateModalSchema.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-4">
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite o nome completo" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formStep1CreateModalSchema.control}
							name="age"
							render={({ field }) => (
								<FormItem className="col-span-4">
									<FormLabel>Idade</FormLabel>
									<FormControl>
										<Input placeholder="Ex: 2" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={formStep1CreateModalSchema.control}
							name="observations"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Observações</FormLabel>
									<FormControl>
										<Textarea placeholder="Digite as observações..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2 mt-auto">
							<DialogClose asChild>
								<Button variant="secondary" onClick={() => formStep1CreateModalSchema.reset()}>
									Cancelar
								</Button>
							</DialogClose>
							<Button type="button" onClick={handleNext}>
								Avançar
							</Button>
						</div>
					</form>
				</Form>
			)}

			{step === 2 && (
				<Form {...formStep2CreateModalSchema}>
					<form onSubmit={formStep2CreateModalSchema.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-4">
							<FormField
								control={formStep2CreateModalSchema.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Selecione o tipo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={AnimalType.Dog}>Cachorro</SelectItem>
												<SelectItem value={AnimalType.Cat}>Gato</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={formStep2CreateModalSchema.control}
								name="sex"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sexo</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="w-full" ref={field.ref}>
													<SelectValue placeholder="Selecione o sexo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={AnimalSex.F}>Fêmea</SelectItem>
												<SelectItem value={AnimalSex.M}>Macho</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex gap-4">
							<FormField
								control={formStep2CreateModalSchema.control}
								name="castration"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormLabel>Castrado</FormLabel>
									</FormItem>
								)}
							/>
							<FormField
								control={formStep2CreateModalSchema.control}
								name="available"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<FormLabel>Disponível</FormLabel>
									</FormItem>
								)}
							/>
						</div>

						<div className="flex justify-end gap-2">
							<Button variant="secondary" onClick={handleBack}>
								Voltar
							</Button>
							<Button type="submit" disabled={isCreatePending || isUpdatePending}>
								<When condition={!data}>{isCreatePending ? "Criando..." : "Criar"}</When>
								<When condition={data}>{isUpdatePending ? "Atualizando..." : "Atualizar"}</When>
							</Button>
						</div>
					</form>
				</Form>
			)}
		</>
	)
}
