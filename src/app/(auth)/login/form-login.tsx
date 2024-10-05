"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { login } from "@/actions/auth/login"
import { useToast } from "@/hooks/use-toast"

// zod schema validation
const formLoginSchema = z.object({
	email: z.string().email("Digite um email válido"),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
	rememberMe: z.boolean().optional(),
})

export default function FormLogin() {
	const form = useForm<z.infer<typeof formLoginSchema>>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})
	const { toast } = useToast()
	const { executeAsync, isPending, result } = useAction(login)
	const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
		await executeAsync(data)
		if (result.serverError) {
			toast({
				title: "Ocorreu um erro ao tentar entrar",
				description: result.serverError,
				variant: "destructive",
			})
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="flex flex-col items-center gap-2 mx-auto">
					<h2 className="text-center">Entre em sua conta</h2>
					<h3 className="text-center">Bem-vindo de volta</h3>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Email</FormLabel>
							<FormControl>
								<Input id="email" placeholder="Digite seu email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Senha</FormLabel>
							<FormControl>
								<Input id="password" type="password" placeholder="Digite sua senha" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-between">
					<FormField
						control={form.control}
						name="rememberMe"
						render={({ field }) => (
							<FormItem className="flex items-center space-y-0">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel htmlFor="rememberMe" className="ml-2 block text-sm font-semibold">
									Lembrar-se
								</FormLabel>
							</FormItem>
						)}
					/>
					<div className="text-sm">
						<Link
							href="/"
							className="font-normal text-emerald-600 hover:text-emerald-500 underline"
						>
							Esqueceu a senha?
						</Link>
					</div>
				</div>
				<Button variant="success" className="w-full" type="submit" disabled={isPending}>
					Entrar
				</Button>
			</form>
		</Form>
	)
}
