"use client"

import { resetPassword } from "@/actions/auth/reset-password"
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
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

const forgotPasswordSchema = z.object({
	email: z.string().email("Por favor, insira um e-mail válido"),
})

// Criando o tipo baseado no esquema de validação
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function FormForgotPassword() {
	// Usando react-hook-form com zod para validação
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
		await executeAsync({ email: data.email })
		toast({
			title: "Recuperação de senha",
			description: "Email enviado com sucesso!",
			variant: "default",
		})
	}

	return (
		<Form {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center mx-auto w-[400px] px-8 sm:p-0"
			>
				<h5 className="text-center mb-4">Recuperação de senha</h5>

				<FormField
					control={methods.control}
					name="email"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Digite seu email" type="email" {...field} />
							</FormControl>
							{errors.email && <FormMessage>{errors.email.message}</FormMessage>}
						</FormItem>
					)}
				/>
				<Button className="w-full mt-8 mb-4	" type="submit" disabled={isPending}>
					{isPending ? "Enviando..." : "Enviar email de recuperação"}
				</Button>

				<Link href="/login" className="text-paragraph-3">
					Voltar para login
				</Link>
			</form>
		</Form>
	)
}
