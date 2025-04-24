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
import { useRouter } from "nextjs-toploader/app"
import { UserRoles } from "@/models/user.model"
import { PasswordInput } from "@/components/custom-ui/password-input"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

// zod schema validation
const formLoginSchema = z.object({
	email: z.string().email("Digite um email válido"),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
	rememberMe: z.boolean().optional(),
})

export default function FormLogin() {
	const router = useRouter()
	const params = useSearchParams()
	const { setUser } = useAuth()
	const form = useForm<z.infer<typeof formLoginSchema>>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	})
	const { toast } = useToast()
	const { executeAsync, isPending } = useAction(login)
	const onSubmit = async (data: z.infer<typeof formLoginSchema>) => {
		const result = await executeAsync(data)
		if (result?.serverError) {
			toast({
				title: "Ocorreu um erro ao tentar entrar",
				description: result.serverError,
				variant: "destructive",
			})
			return
		}
		toast({
			title: "Bem vindo ao Pata Amada",
			description: "Acompanhe/gerencia a ong",
			variant: "default",
		})
		if (result?.data?.user) {
			setUser(result?.data?.user)
		}
		const urlToRedirect = params.get("from")
		if (urlToRedirect) {
			router.replace(urlToRedirect)
			return
		}
		router.replace(result?.data?.role === UserRoles.Admin ? "/dashboard" : "animals")
	}
	return (
		<Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[400px] px-8 sm:p-0">
			<div className="flex flex-col items-center gap-2 mx-auto">
				<h5 className="text-center text-h5">Entre em sua conta</h5>
				<p className="text-center text-subtitle-2">Bem-vindo de volta</p>
			</div>

			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="Digite seu email" type="email" {...field} />
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
						<FormLabel>Senha</FormLabel>
						<FormControl>
							<PasswordInput placeholder="Digite sua senha" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex flex-row justify-between gap-4">
				<FormField
					control={form.control}
					name="rememberMe"
					render={({ field }) => (
						<FormItem className="flex items-center gap-2 space-y-0">
							<FormControl>
								<Checkbox checked={field.value} onCheckedChange={field.onChange} />
							</FormControl>
							<FormLabel className="mb-7 text-paragraph-4">Lembrar-se</FormLabel>
						</FormItem>
					)}
				/>
				<Link href="/forgot-password" className="underline text-zinc-400 text-paragraph-3">
					Esqueceu a senha?
				</Link>
			</div>

			<Button variant="default" className="w-full" type="submit" disabled={isPending}>
				{isPending ? "Entrando..." : "Entrar"}
			</Button>
			<p className="text-zinc-400 text-center text-paragraph-3">
				Ainda não tem uma conta?
				<Link className="text-red-700 text-paragraph-4" href="/register">
					{" "}
					Cadastre-se
				</Link>
			</p>
		</form>
	</Form>
	)
}
