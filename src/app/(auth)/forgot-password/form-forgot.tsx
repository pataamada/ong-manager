"use client"

import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAction } from "next-safe-action/hooks"
import { resetPassword } from "@/actions/auth/reset-password"
import { useToast } from "@/hooks/use-toast"

const forgotPasswordSchema = z.object({
	email: z.string().email("Por favor, insira um e-mail válido"),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function FormForgotPassword() {
	const methods = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	})
	const { toast } = useToast()
	const {
		handleSubmit,
		formState: { errors },
	} = methods
	const { executeAsync, isPending } = useAction(resetPassword)
	// Função que será chamada ao submeter o formulário
	const onSubmit = async (data: ForgotPasswordFormData) => {
		const result = await executeAsync({ email: data.email })
		if(result?.serverError){
			toast({
				title: "Erro ao enviar email",
				description: result.serverError,
				variant: "destructive",
			})
			return
		}
		toast({
			title: "Recuperação de senha",
			description: "Email enviado com sucesso!",
			variant: "default",
		})
		methods.reset()
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="gap-6 w-full flex flex-col md:max-w-[400px] my-auto mx-auto"
			>
				<div className="flex flex-col items-center gap-2 mx-auto">
					<h2 className="text-center text-h5">Recuperação de senha</h2>
				</div>

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

				<Button className="w-full" type="submit" disabled={isPending}>
					{isPending ? "Enviando..." : "Enviar email de recuperação"}
				</Button>
				<Button asChild variant="ghost">
					<Link href="/login">Voltar para login</Link>
				</Button>
			</form>
		</FormProvider>
	)
}
