"use client"

import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { createUser } from "@/actions/auth/user/create"
import { PasswordInput } from "@/components/custom-ui/password-input"
import { validateCpf } from "@/utils"
import { InputMask } from "@react-input/mask"
import { useAction } from "next-safe-action/hooks"

const formRegisterSchema = z.object({
	fullName: z.string().min(4, "Nome completo é obrigatório"),
	cpf: z
		.string()
		.min(11, "O CPF deve ter pelo menos 11 caracteres")
		.trim()
		.transform(cpf => cpf.replaceAll(".", "").replace("-", "")),
	email: z.string().email("Por favor, insira um e-mail válido"),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
	confirmPassword: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres"),
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem",
	path: ["confirmPassword"],
}).superRefine((data, ctx) => {
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
	const { handleSubmit, formState: { errors } } = methods
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
			<form onSubmit={handleSubmit(onSubmit)} className="gap-6 max-w-[90%] md:max-w-[400px] w-full flex flex-col mt-8 mx-auto">
				<div className="flex flex-col items-center gap-2">
					<h2 className="text-center">Apadrinhe seu animal</h2>
					<h3 className="text-center">Cadastre-se na plataforma</h3>
				</div>

				<FormField
					name="fullName"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Nome completo</FormLabel>
							<FormControl>
								<Input id="fullName" placeholder="Digite seu nome completo" {...field} />
							</FormControl>
							{errors.fullName && <FormMessage>{errors.fullName.message}</FormMessage>}
						</FormItem>
					)}
				/>

				<FormField
					name="cpf"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">CPF</FormLabel>
							<FormControl>
								<InputMask
									mask="___.___.___-__"
									replacement={{ _: /\d/ }}
									component={Input}
									id="cpf"
									placeholder="Digite seu CPF"
									{...field}
								/>
							</FormControl>
							{errors.cpf && <FormMessage>{errors.cpf.message}</FormMessage>}
						</FormItem>
					)}
				/>

				<FormField
					name="email"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Email</FormLabel>
							<FormControl>
								<Input id="email" placeholder="Digite seu email" {...field} />
							</FormControl>
							{errors.email && <FormMessage>{errors.email.message}</FormMessage>}
						</FormItem>
					)}
				/>

				<FormField
					name="password"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Senha</FormLabel>
							<FormControl>
								<PasswordInput id="password" placeholder="Digite sua senha" {...field} />
							</FormControl>
							{errors.password && <FormMessage>{errors.password.message}</FormMessage>}
						</FormItem>
					)}
				/>

				<FormField
					name="confirmPassword"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Confirmar senha</FormLabel>
							<FormControl>
								<PasswordInput id="confirmPassword" placeholder="Confirme sua senha" {...field} />
							</FormControl>
							{errors.confirmPassword && <FormMessage>{errors.confirmPassword.message}</FormMessage>}
						</FormItem>
					)}
				/>

				<Button className="w-full" type="submit" disabled={isPending}>
					Cadastrar
				</Button>

				<div className="text-center mt-4">
					<span className="text-sm font-normal">Já tem uma conta? </span>
					<Link href="/login" className="text-sm font-semibold text-emerald-600 hover:text-emerald-500">
						Entrar
					</Link>
				</div>
			</form>
		</FormProvider>
	)
}
