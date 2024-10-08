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
import { validateCpf } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import type { DialogProps } from "@radix-ui/react-dialog"
import { useEffect, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { InputMask } from "@react-input/mask"
import { PasswordInput } from "@/components/custom-ui/password-input"
import { useAction } from "next-safe-action/hooks"
import { createUser } from "@/actions/auth/user/create"
import { updateUser } from "@/actions/auth/user/update"
import type { CreateUserPayload } from "@/models/user.model"
import { toast } from "@/hooks/use-toast"
import { SafeActionResult } from "next-safe-action"
import { getCurrentUser } from "@/lib/firebase/firebase-admin"
import { useAtom } from "jotai"
import { userAtom } from "@/store/user"
interface CreateUpdateUserModal extends DialogProps {
	children?: ReactNode
	data?: Partial<User> | null
	onSubmit?: (user: Partial<User>) => unknown
}
const createUserSchema = z
	.object({
		name: z.string().min(4, "Nome deve ter no mínimo 4 carateres").trim(),
		email: z.string().email("Digite um email válido").trim(),
		cpf: z
			.string()
			// .min(11, "O CPF deve ter pelo menos 11 caracteres")
			.trim()
			.transform(cpf => cpf.replaceAll(".", "").replace("-", ""))
			.optional()
			.or(z.literal("")),
		password: z
			.string()
			.min(8, "A senha deve ter pelo menos 8 caracteres")
			.trim()
			.optional()
			.or(z.literal("")),
	})
	.superRefine((value, ctx) => {
		const isValidCpf = validateCpf(value.cpf!)
		if (isValidCpf) {
			return
		}
		// ctx.addIssue({ code: "custom", message: "Digite um cpf válido", path: ["cpf"] })
	})

export function CreateUpdateUserModal({
	children,
	data,
	onSubmit,
	open,
	...props
}: CreateUpdateUserModal) {
	const [user, setUser] = useAtom(userAtom)
	const form = useForm<z.infer<typeof createUserSchema>>({
		resolver: zodResolver(createUserSchema),
		values: {
			name: data?.name || "",
			cpf: data?.cpf || "",
			email: data?.email || "",
			password: "",
		},
	})
	const { executeAsync: create, isPending: pendingCreate } = useAction(createUser)
	const { executeAsync: update, isPending: pendingUpdate } = useAction(updateUser)

	const handleOnSubmit = async ({
		name,
		email,
		password,
		cpf,
	}: z.infer<typeof createUserSchema>) => {
		if (!password?.length && !data) {
			form.setError("password", { type: "required", message: "Senha é obrigatória" })
			return
		}

		// let result: SafeActionResult<CreateUserSchema>

		if (!data && password) {
			const result = await create({ name, email, password, cpf: cpf! })
			return result
		}
		// if (result?.serverError) {
		// 	toast({
		// 		title: "Erro ao criar usuário",
		// 		description: result.serverError,
		// 		variant: "destructive",
		// 	})
		// 	return
		// }
		// toast({
		// 	title: "Usuário Criado",
		// 	description: "",
		// 	variant: "default",
		// })

		const result = await update({ uid: user!.user.uid, name, email, password, cpf: cpf! })
		console.log(result);
		
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
