"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import { createUser } from "@/actions/auth/user/create"
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { validateCpf } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

const formRegisterSchema = z
	.object({
		fullName: z
			.string()
			.min(4, "Nome completo é obrigatório")
			.max(256, "O nome completo deve ter no máximo 256 caracteres"),
		cpf: z
			.string()
			.min(11, "O CPF deve ter pelo menos 11 caracteres")
			.trim()
			.transform(cpf => cpf.replaceAll(".", "").replace("-", "")),
		email: z
			.string()
			.email("Por favor, insira um e-mail válido")
			.max(256, "Máximo de 256 caracteres"),
		password: z
			.string()
			.min(8, "A senha deve ter pelo menos 8 caracteres")
			.max(256, "Máximo de 256 caracteres"),
		confirmPassword: z
			.string()
			.min(8, "A confirmação de senha deve ter pelo menos 8 caracteres")
			.max(256, "Máximo de 256 caracteres"),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	})
	.superRefine((data, ctx) => {
		const isValidCpf = validateCpf(data.cpf || "")
		if (!isValidCpf) {
			ctx.addIssue({ path: ["cpf"], code: "custom", message: "Digite um cpf válido" })
		}
	})

type RegisterFormData = z.infer<typeof formRegisterSchema>

export default function FormRegister() {
	const methods = useForm<RegisterFormData>({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: "",
			cpf: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})

	const { toast } = useToast()
	const {
		handleSubmit,
		formState: { errors },
	} = methods
	const { executeAsync, isPending } = useAction(createUser)
	const onSubmit = async (data: RegisterFormData) => {
		const result = await executeAsync({
			name: data.fullName,
			cpf: data.cpf,
			email: data.email,
			password: data.password,
		})
		if (!result?.serverError) {
			toast({
				title: "Cadastro realizado com sucesso",
				description: "Você foi cadastrado com sucesso!",
				variant: "default",
			})
			return
		}
		toast({
			title: "Erro no cadastro",
			description: "Ocorreu um erro ao tentar se cadastrar.",
			variant: "destructive",
		})
	}

	return (
		<FormProvider {...methods}>
			<div className="flex flex-col items-center gap-2 mx-auto mb-6">
				<h5 className="text-center">Apadrinhe seu animal</h5>
				<p className="text-center text-subtitle-2">Cadastre-se na plataforma</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4
			 w-[400px] px-8 sm:p-0
			"
			>
				<FormField
					control={methods.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome completo</FormLabel>
							<FormControl>
								<Input placeholder="Digite seu nome completo" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={methods.control}
					name="cpf"
					render={({ field }) => (
						<FormItem>
							<FormLabel>CPF</FormLabel>
							<FormControl>
								<Input
									placeholder="Digite seu CPF"
									type="text"
									maxLength={14}
									{...field}
									onInput={e => {
										let value = e.currentTarget.value.replace(/\D/g, "")
										value = value.replace(/(\d{3})(\d)/, "$1.$2")
										value = value.replace(/(\d{3})(\d)/, "$1.$2")
										value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
										e.currentTarget.value = value
									}}
								/>
							</FormControl>
							{errors.cpf && <FormMessage>{errors.cpf.message}</FormMessage>}
						</FormItem>
					)}
				/>
				<FormField
					control={methods.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={methods.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Digite sua senha" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={methods.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmar senha</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Confirme sua senha" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="w-full" type="submit" disabled={isPending}>
					Cadastrar
				</Button>
				<p className="text-zinc-400 text-center text-paragraph-3 !mt-6">
					Já tem uma conta?
					<Link className="text-red-700 text-paragraph-4 " href="/login">
						{" "}
						Voltar para login
					</Link>
				</p>
			</form>
		</FormProvider>
	)
}
