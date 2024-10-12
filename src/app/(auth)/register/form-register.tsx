"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/actions/auth/user/create"; // Import the action

// Validação de schema com Zod
const formRegisterSchema = z.object({
	fullName: z.string().min(4, "Nome completo é obrigatório"),
	cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
	email: z.string().email("Por favor, insira um e-mail válido"),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
	confirmPassword: z.string().min(8, "A confirmação de senha deve ter pelo menos 8 caracteres"),
}).refine(data => data.password === data.confirmPassword, {
	message: "As senhas não coincidem",
	path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof formRegisterSchema>;

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
	});

	const { toast } = useToast();
	const {
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await createUser({
				name: data.fullName,
				cpf: data.cpf,
				email: data.email,
				password: data.password,
			});
			toast({
				title: "Cadastro realizado com sucesso",
				description: "Você foi cadastrado com sucesso!",
				variant: "default",
			});
		} catch (error) {
			toast({
				title: "Erro no cadastro",
				description: "Ocorreu um erro ao tentar se cadastrar.",
				variant: "destructive",
			});
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex flex-col items-center gap-2 mx-auto">
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
							{errors.fullName && (
								<FormMessage>{errors.fullName.message}</FormMessage>
							)}
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
								<Input id="cpf" placeholder="Digite seu CPF" {...field} />
							</FormControl>
							{errors.cpf && (
								<FormMessage>{errors.cpf.message}</FormMessage>
							)}
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
							{errors.email && (
								<FormMessage>{errors.email.message}</FormMessage>
							)}
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
								<Input id="password" type="password" placeholder="Digite sua senha" {...field} />
							</FormControl>
							{errors.password && (
								<FormMessage>{errors.password.message}</FormMessage>
							)}
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
								<Input id="confirmPassword" type="password" placeholder="Confirme sua senha" {...field} />
							</FormControl>
							{errors.confirmPassword && (
								<FormMessage>{errors.confirmPassword.message}</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<Button className="w-full" type="submit">
					Cadastrar
				</Button>

				<div className="text-center">
					<span className="text-sm font-normal">Já tem uma conta? </span>
					<Link href="/login" className="text-sm font-semibold text-emerald-600 hover:text-emerald-500">
						Entrar
					</Link>
				</div>
			</form>
		</FormProvider>
	);
}
