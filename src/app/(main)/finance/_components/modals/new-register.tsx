"use client"
import { saveDonationAction } from "@/actions/transaction/saveDonation"
import { saveExpenseAction } from "@/actions/transaction/saveExpense"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { validateCpf } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { DialogProps } from "@radix-ui/react-dialog"
import { InputMask } from "@react-input/mask"
import Image from "next/image"
import { type FormEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Steps } from "../Steps"
import { findAnimalAction } from "@/actions/animal/findAnimals"
import type { Animal } from "@/models/animal.model"
import {
	type Category,
	ESaveDonationMethod,
	ETransactionTypeDonation,
} from "@/models/donation.model"
import { ETransactionTypeExpense } from "@/models/expense.model"

interface INewRegisterModal extends DialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onReloadData: () => void
}

const mockedCauses = [
	"Aluguel",
	"Água",
	"Brinquedos",
	"Castração",
	"Energia Elétrica",
	"Exames/Tratamento Médico",
	"Gás",
	"Internet",
	"Manutenção do espaço",
	"Produtos de Limpeza",
	"Ração/Suplementos",
	"Remédios",
	"Salário",
	"Vacinas/Vermífugos",
]

const mockedSteps = {
	donation: [
		{ step: 1, label: "Tipo do registro" },
		{ step: 2, label: "Doador" },
		{ step: 3, label: "Dados" },
	],
	expensive: [
		{ step: 1, label: "Tipo do registro" },
		{ step: 2, label: "Doador" },
	],
}

const DonationStepTwoSchema = z
	.object({
		name: z.string().optional(),
		cpf: z
			.string()
			.min(11, "O CPF deve ter pelo menos 11 caracteres")
			.trim()
			.transform(cpf => cpf.replaceAll(".", "").replace("-", ""))
			.optional()
			.or(z.literal("")),
	})
	.refine(data => !data.cpf || validateCpf(data.cpf), {
		message: "Digite um CPF valido",
		path: ["cpf"],
	})

const DonationStepThreeSchema = z.object({
	value: z.string(),
	cause: z.string(),
	animalId: z.string(),
	description: z.string().trim(),
})

const ExpensiveStepTwoSchema = z.object({
	value: z.string(),
	categoryId: z.string(),
	description: z.string().trim(),
})

export const NewRegister = ({ open, onOpenChange, onReloadData, ...props }: INewRegisterModal) => {
	const [type, setType] = useState<ETransactionTypeDonation | ETransactionTypeExpense>(
		ETransactionTypeDonation.Donation,
	)
	const [step, setStep] = useState(1)
	const [donationsFiles] = useState<{ file: File; preview: string }[]>([])
	const [animals, setAnimals] = useState<Animal[]>([])

	// const handleImageUpload = (event: any, setValue: any) => {
	// 	const files = Array.from(event.target.files)
	// 	const newImages = files.map(file => ({
	// 		file,
	// 		preview: URL.createObjectURL(file),
	// 	}))
	// 	setValue(prevImages => [...prevImages, ...newImages])
	// }

	// const removeImage = (indexToRemove: number, setValue: any) => {
	// 	setValue(prevImages => prevImages.filter((_, index) => index !== indexToRemove))
	// }

	const steps = type === "donation" ? mockedSteps.donation : mockedSteps.expensive

	const formDonationStepTwo = useForm<z.infer<typeof DonationStepTwoSchema>>({
		resolver: zodResolver(DonationStepTwoSchema),
	})

	const formDonationStepThree = useForm<z.infer<typeof DonationStepThreeSchema>>({
		resolver: zodResolver(DonationStepThreeSchema),
	})

	const formExpensiveStepTwo = useForm<z.infer<typeof ExpensiveStepTwoSchema>>({
		resolver: zodResolver(ExpensiveStepTwoSchema),
	})

	const handleOnSubmitStepTwo = () => {
		setStep(step + 1)
	}

	const handleOnSubmitStepThree = async (e: FormEvent) => {
		e.preventDefault()
		const formData = {
			...formDonationStepThree.control._formValues,
			proof: donationsFiles.map(item => item.file),
		}

		try {
			const validatedData = DonationStepThreeSchema.parse(formData)
			const allData = {
				userName: formDonationStepTwo.control._formValues.name ?? "",
				userCpfCnpj: formDonationStepTwo.control._formValues.cpf ?? "",
				animalId: validatedData.animalId,
				category: validatedData.cause as Category,
				value: Number(validatedData.value),
				description: validatedData.description,
				transactionType: ETransactionTypeDonation.Donation,
				cause: validatedData.cause,
				saveDonationMethod: ESaveDonationMethod.Manual,
			}
			const response = await saveDonationAction({ ...allData })
			if (response?.serverError) {
				toast({
					title: "Erro ao cadastrar doação",
					description: response.serverError,
					variant: "destructive",
				})
				return
			}

			onOpenChange(false)
			onReloadData()
			toast({
				title: "Doação",
				description: "Doação cadastrada com sucesso!",
				variant: "default",
			})
		} catch (error) {
			console.error("Erro:", error)
		}
	}

	const handleOnSubmitStepTwoExpensive = async (data: z.infer<typeof ExpensiveStepTwoSchema>) => {
		try {
			const form = {
				category: data.categoryId,
				description: data.description,
				value: Number(data.value),
				transactionType: ETransactionTypeExpense.Expense,
			}
			const response = await saveExpenseAction({
				category: form.category,
				description: form.description,
				value: form.value,
				transactionType: form.transactionType,
			})
			if (response?.serverError) {
				toast({
					title: "Erro ao cadastrar despesa",
					description: response.serverError,
					variant: "destructive",
				})
				return
			}

			onOpenChange(false)
			onReloadData()
			toast({
				title: "Despesa",
				description: "Despesa cadastrada com sucesso!",
				variant: "default",
			})
		} catch (error) {
			console.error("Erro:", error)
		}
	}

	const handleCancel = () => {
		setStep(step === 1 ? 1 : step - 1)
	}

	const handleNext = () => {
		if (type === "donation" && step === 2) {
			formDonationStepTwo.handleSubmit(handleOnSubmitStepTwo)
		}
		setStep(step + 1)
	}

	const getAnimals = async () => {
		const response = await findAnimalAction()
		if (response?.data) {
			setAnimals(JSON.parse(response.data) as Animal[])
		}
	}

	useEffect(() => {
		getAnimals()
	}, [])

	let content = (
		<div className="flex gap-4">
			<div
				onClick={() => setType(ETransactionTypeDonation.Donation)}
				className={`flex w-full flex-col ${
					type === ETransactionTypeDonation.Donation
						? "border-2 border-[#27272A]"
						: "border border-[#E4E4E7]"
				} gap-4 p-6 rounded-lg hover:cursor-pointer`}
			>
				<div
					className={
						"flex justify-center items-center rounded h-[56px] w-[56px] bg-[#F4F4F5]"
					}
				>
					<Image
						src={"/finance/heart-handshake.svg"}
						width={32}
						height={32}
						priority
						alt="ícone"
					/>
				</div>
				<div>
					<div className="font-bold text-2xl text-[#09090B]">Doação</div>
					<div className="font-normal text-base text-[#52525B]">
						Registrar entrada monetária
					</div>
				</div>
			</div>
			<div
				onClick={() => setType(ETransactionTypeExpense.Expense)}
				className={`flex w-full flex-col ${
					type === ETransactionTypeExpense.Expense
						? "border-2 border-[#27272A]"
						: "border border-[#E4E4E7]"
				} gap-4 p-6 rounded-lg hover:cursor-pointer`}
			>
				<div
					className={
						"flex justify-center items-center rounded h-[56px] w-[56px] bg-[#F4F4F5]"
					}
				>
					<Image
						src={"/finance/trending-down-black.svg"}
						width={32}
						height={32}
						priority
						alt="ícone"
					/>
				</div>
				<div>
					<div className="font-bold text-2xl text-[#09090B]">Despesas</div>
					<div className="font-normal text-base text-[#52525B]">
						Controlar gastos e saídas{" "}
					</div>
				</div>
			</div>
		</div>
	)

	if (type === ETransactionTypeDonation.Donation && step === 2) {
		content = (
			<>
				<div className="flex w-full rounded-md mb-4 py-2 px-3 gap-2 bg-[#FFF7ED] border border-[#FB923C]">
					<Image src={"/finance/info.svg"} width={16} height={16} priority alt="ícone" />
					<div className="flex gap-1">
						<div className="font-normal text-base text-[#FB923C]">
							Caso não seja preenchido, a doação será
						</div>
						<div className="font-bold text-base text-[#FB923C]">anônima.</div>
					</div>
				</div>

				<Form {...formDonationStepTwo}>
					<form
						onSubmit={formDonationStepTwo.handleSubmit(handleOnSubmitStepTwo)}
						className="flex flex-col gap-6"
					>
						<div className="grid gap-2">
							<FormField
								control={formDonationStepTwo.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">
											Nome completo
										</FormLabel>
										<FormControl>
											<Input
												id="name"
												placeholder="Digite o nome completo"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={formDonationStepTwo.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">CPF</FormLabel>
										<FormControl>
											<InputMask
												mask="___.___.___-__"
												replacement={{ _: /\d/ }}
												component={Input}
												id="cpf"
												placeholder="ex: ###.###.###-##"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-end gap-2 mt-6">
							<Button
								variant="outline"
								className="flex items-center gap-2"
								onClick={handleCancel}
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								variant="default"
								className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
							>
								{step === steps.length ? "Criar" : "Avançar"}
							</Button>
						</div>
					</form>
				</Form>
			</>
		)
	}

	if (type === ETransactionTypeDonation.Donation && step === 3) {
		content = (
			<Form {...formDonationStepThree}>
				<form onSubmit={handleOnSubmitStepThree} className="flex flex-col gap-6">
					<div className="grid gap-2">
						<FormField
							control={formDonationStepThree.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Qual o valor da doação?
									</FormLabel>
									<FormControl>
										<Input id="value" placeholder="ex: 230,00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formDonationStepThree.control}
							name="cause"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Qual a causa da doação??
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecionar causa" />
											</SelectTrigger>
											<SelectContent>
												{mockedCauses.map(i => (
													<SelectItem key={i} value={i}>
														{i}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formDonationStepThree.control}
							name="animalId"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Qual animal recebeu a doação?
									</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecionar animal" />
											</SelectTrigger>
											<SelectContent>
												{animals?.[0]?.name &&
													animals.map(i => (
														<SelectItem key={i.name} value={i.name}>
															{i.name}
														</SelectItem>
													))}
												<SelectItem key={"all"} value={"Todos"}>
													{"Todos"}
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formDonationStepThree.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Descrição</FormLabel>
									<FormControl>
										<div className="flex items-center w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input gap-2">
											<textarea
												id="description"
												placeholder="Descreva do que se trata a despesa..."
												className="w-full h-[100px] py-2 resize-none bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
												onChange={field.onChange}
												value={field.value}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-end gap-2 mt-6">
						<Button
							variant="outline"
							className="flex items-center gap-2"
							onClick={handleCancel}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							variant="default"
							className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
						>
							{step === steps.length ? "Criar" : "Avançar"}
						</Button>
					</div>
				</form>
			</Form>
		)
	}

	if (type === ETransactionTypeExpense.Expense && step === 2) {
		content = (
			<Form {...formExpensiveStepTwo}>
				<form
					onSubmit={formExpensiveStepTwo.handleSubmit(handleOnSubmitStepTwoExpensive)}
					className="flex flex-col gap-6"
				>
					<div className="grid gap-2">
						<FormField
							control={formExpensiveStepTwo.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Qual o valor da despesa?
									</FormLabel>
									<FormControl>
										<Input id="value" placeholder="ex: 230,00" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formExpensiveStepTwo.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Categoria</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Selecionar causa" />
											</SelectTrigger>
											<SelectContent>
												{mockedCauses.map(i => (
													<SelectItem key={i} value={i}>
														{i}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formExpensiveStepTwo.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Descrição</FormLabel>
									<FormControl>
										<div className="flex items-center w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input gap-2">
											<textarea
												id="description"
												placeholder="Descreva do que se trata a despesa..."
												className="w-full h-[100px] py-2 resize-none bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
												onChange={field.onChange}
												value={field.value}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-end gap-2 mt-6">
						<Button
							variant="outline"
							className="flex items-center gap-2"
							onClick={handleCancel}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							variant="default"
							className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
						>
							{step === steps.length ? "Criar" : "Avançar"}
						</Button>
					</div>
				</form>
			</Form>
		)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange} {...props}>
			<DialogContent className="sm:max-w-[653px]">
				<div className="flex flex-col gap-6">
					<div className="font-bold text-2xl text-[#09090B]">Novo registro</div>

					<div className="flex flex-col">
						{/* steps */}
						<div className="mx-auto mb-10 flex justify-between">
							{steps.map(i => (
								<Steps
									key={i.step}
									label={i.label}
									step={i.step}
									currentStep={step}
									stepsCount={steps.length}
								/>
							))}
						</div>

						{content}

						{step === 1 && (
							<div className="flex justify-end gap-2 mt-6">
								<Button
									variant="outline"
									className="flex items-center gap-2"
									onClick={handleCancel}
								>
									Cancelar
								</Button>
								<Button
									variant="default"
									className="flex items-center gap-2 bg-[#09090B] hover:bg-[#3A3A3B]"
									onClick={handleNext}
								>
									{step === steps.length ? "Criar" : "Avançar"}
								</Button>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
