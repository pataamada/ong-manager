import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogClose,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { User } from "@/models/user.model"
import { zodResolver } from "@hookform/resolvers/zod"
import type { DialogProps } from "@radix-ui/react-dialog"
import { useEffect, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
interface CreateUpdateUserModal extends DialogProps {
	children?: ReactNode
	data?: Partial<User> | null
	onSubmit?: (user: Partial<User>) => unknown
}
const createUserSchema = z.object({
	name: z.string().min(4, "Nome deve ter no mínimo 4 carateres").trim(),
	email: z.string().email("Digite um email válido").trim(),
	cpf: z.string().min(11, "O CPF deve ter pelo menos 11 caracteres").trim(),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres").trim().optional(),
})
export function CreateUpdateUserModal({
	children,
	data,
	onSubmit,
	open,
	...props
}: CreateUpdateUserModal) {
	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		values: { name: data?.name || "", cpf: data?.cpf || "", email: data?.email || "" },
	})
	const handleOnSubmit = (data: z.infer<typeof createUserSchema>) => {
		onSubmit?.({ email: data.email, name: data.name, cpf: data.cpf })
	}
	useEffect(() => {
		if (!open) {
			form.clearErrors()
		}
	}, [open, form])
	return (
		<Dialog open={open} {...props}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex flex-col gap-6">
						<DialogHeader>
							<DialogTitle>{data ? "Atualizar usuário" : "Criar usuário"}</DialogTitle>
							<DialogDescription>
								Crie novos usuários ou edite suas informações, após isso clique em salvar/criar.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Nome completo</FormLabel>
										<FormControl>
											<Input id="name" placeholder="Digite o nome do usuário" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cpf"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">CPF</FormLabel>
										<FormControl>
											<Input id="cpf" placeholder="Digite o CPF do usuário" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Email</FormLabel>
										<FormControl>
											<Input id="email" placeholder="Digite o E-mail do usuário" {...field} />
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
											<Input id="password" placeholder="Digite a senha do usuário" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancelar</Button>
							</DialogClose>
							<Button type="submit">{data ? "Salvar" : "Criar"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
