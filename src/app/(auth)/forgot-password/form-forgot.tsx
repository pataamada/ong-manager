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
import { useAction } from "next-safe-action/hooks";
import { resetPassword } from "@/actions/auth/reset-password";

// Definindo o esquema de validação com Zod
const forgotPasswordSchema = z.object({
	email: z
		.string()
		.email("Por favor, insira um e-mail válido")
});

// Criando o tipo baseado no esquema de validação
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function FormForgotPassword() {
	// Usando react-hook-form com zod para validação
	const methods = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods;
    const {execute, isPending} = useAction(resetPassword)
	// Função que será chamada ao submeter o formulário
	const onSubmit = (data: ForgotPasswordFormData) => {
		execute({email:data.email})
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex flex-col items-center gap-2 mx-auto">
					<h2 className="text-center">Recuperação de senha</h2>
				</div>

				<FormField
					name="email"
					control={methods.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Email</FormLabel>
							<FormControl>
								<Input
									id="email"
									placeholder="Digite seu email"
									{...field}
								/>
							</FormControl>
							{errors.email && (
								<FormMessage>{errors.email.message}</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<Button className="w-full" type="submit" disabled={isPending}>
					{isPending ? "Enviando..." : "Enviar email de recuperação"}
				</Button>
                <div className="text-center">
	            <Link href="/login" className="text-sm font-normal text-black hover:text-emerald-500">
		        Voltar para login
	            </Link>
                </div>

			</form>
		</FormProvider>
	);
}
