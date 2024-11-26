"use client"
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
import { UserRoles, type User } from "@/models/user.model"
import { validateCpf } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { DialogProps } from "@radix-ui/react-dialog"
import { useEffect, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InputMask, format } from "@react-input/mask"
import { PasswordInput } from "@/components/custom-ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { useCreateUser, useUpdateUser } from "../../mutations"

interface CreateUpdateUserModal extends DialogProps {
	children?: ReactNode
	data?: Partial<User> | null
	onSubmit?: () => unknown
	onClose?: () => unknown
}
const createUserSchema = z
	.object({
		uuid: z.string(),
		name: z
			.string()
			.min(4, "Nome deve ter no mínimo 4 carateres")
			.trim()
			.max(256, "Máximo de 256 caracteres"),
		email: z.string().email("Digite um email válido").trim().max(256, "Máximo de 256 caracteres"),
		cpf: z
			.string()
			.min(11, "O CPF deve ter pelo menos 11 caracteres")
			.trim()
			.transform(cpf => cpf.replaceAll(".", "").replace("-", ""))
			.optional()
			.or(z.literal("")),
		password: z
			.string()
			.min(8, "A senha deve ter pelo menos 8 caracteres")
			.trim()
			.max(256, "Máximo de 256 caracteres")
			.optional()
			.or(z.literal("")),
	})
	.refine(data => !data.cpf || validateCpf(data.cpf), {
		message: "Digite um CPF valido",
		path: ["cpf"],
	})

export function CreateUpdateUserModal({
	children,
	data,
	open,
	onClose,
	onSubmit,
	...props
}: CreateUpdateUserModal) {
	const { toast } = useToast()
	const { mutateAsync: create, isPending: pendingCreate, error: errorCreate } = useCreateUser()
	const { mutateAsync: update, isPending: pendingUpdate, error: errorUpdate } = useUpdateUser()
	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		values: {
			uuid: data?.uid || "",
			name: data?.name || "",
			cpf: format(data?.cpf || "", { mask: "___.___.___-__", replacement: { _: /\d/ } }),
			email: data?.email || "",
			password: "",
		},
	})

	const handleOnSubmit = async ({
		uuid,
		name,
		email,
		password,
		cpf,
	}: z.infer<typeof createUserSchema>) => {
		if (!password && !data) {
			form.setError("password", { type: "required", message: "Senha é obrigatória" })
			return
		}

		if (!cpf && !data) {
			form.setError("cpf", { type: "validate", message: "Digite um cpf válido" })
			return
		}

		onClose?.()
		if (!data && password) {
			await create({ name, email, password, cpf: cpf!, role: UserRoles.Authenticated })

			if (errorCreate) {
				toast({
					title: "Erro ao criar usuário",
					description: errorCreate.message,
					variant: "destructive",
				})
				return
			}

			toast({
				title: "Usuário Criado",
				description: "com sucesso!",
				variant: "default",
			})
			onSubmit?.()
			return
		}
		const result = await update({ uid: uuid, name })
		if (errorUpdate) {
			toast({
				title: "Erro ao editar usuário",
				description: errorUpdate.message,
				variant: "destructive",
			})
			return
		}
		toast({
			title: "Usuário editado",
			description: "com sucesso!",
			variant: "default",
		})
		onSubmit?.()
		return result
	}
	useEffect(() => {
		if (!open) {
			form.clearErrors()
			form.reset()
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
											<InputMask
												mask="___.___.___-__"
												replacement={{ _: /\d/ }}
												component={Input}
												id="cpf"
												placeholder="Digite o CPF do usuário"
												{...field}
											/>
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
											<PasswordInput
												id="password"
												placeholder="Digite a senha do usuário"
												{...field}
											/>
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
							<Button type="submit" disabled={pendingCreate || pendingUpdate}>
								{data ? "Salvar" : "Criar"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
