import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	CardContent,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { InputMask } from "@react-input/mask"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useSettings } from "./mutations/use-settings"
import { updateSettingsAction } from "@/actions/settings/update"
import { Loader2 } from "lucide-react"

const whatsappRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/
const instagramRegex = /^@\w+$/
const schema = z
	.object({
		type: z.union([z.literal("whatsapp"), z.literal("instagram")]),
		whatsapp: z.string().trim().max(512, "Máximo de 512 caracteres").optional(),
		instagram: z.string().trim().max(512, "Máximo de 512 caracteres").optional(),
	})
	.superRefine((data, ctx) => {
		if (data.type === "instagram") {
			const isValidInstagram = instagramRegex.test(data.instagram || "")
			if (!isValidInstagram) {
				ctx.addIssue({
					path: ["instagram"],
					code: "custom",
					message: "Digite um perfil de Instagram válido",
				})
			}
			return
		}
		const isValidWhatsapp = whatsappRegex.test(data.whatsapp || "")
		if (!isValidWhatsapp) {
			ctx.addIssue({
				path: ["whatsapp"],
				code: "custom",
				message: "Digite um número de WhatsApp válido",
			})
		}
	})

export function AdoptionMethod() {
	const { data: settings, isLoading } = useSettings()

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		values: {
			type: settings?.adoption?.method || "whatsapp",
			whatsapp: settings?.adoption?.whatsapp || "",
			instagram: settings?.adoption?.instagram || "",
		},
	})
	const handleOnSubmit = async ({ type, whatsapp, instagram }: z.infer<typeof schema>) => {
		await updateSettingsAction({
			id: settings?.id || "",
			adoption: {
				method: type,
				whatsapp,
				instagram,
			},
		})
	}
	const disabled =
		form.formState.isSubmitting || Object.keys(form.formState.errors).length > 0 || isLoading
	const contactMethod = useWatch({
		control: form.control,
		name: "type",
	})
	return (
		<Card>
			<CardHeader>
				<CardTitle>Método de Contato para Adoção</CardTitle>
				<CardDescription>
					Defina como os interessados em adoção entrarão em contato com sua organização.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{isLoading ? (
					<Loader2 className="h-6 w-6 animate-spin" />
				) : (
					<Tabs
						value={contactMethod}
						onValueChange={value =>
							form.setValue("type", value as "whatsapp" | "instagram")
						}
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
							<TabsTrigger value="instagram">Instagram</TabsTrigger>
						</TabsList>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleOnSubmit)}
								className="flex flex-col gap-6"
							>
								<TabsContent value="whatsapp" className="space-y-4 pt-4">
									<div className="bg-muted/50 p-4 rounded-md">
										<p className="text-sm">
											Ao utilizar o WhatsApp como método de contato, podemos
											pré-configurar mensagens que já incluem informações
											importantes como o nome do interessado, o animal que
											deseja adotar e outras informações relevantes,
											facilitando o processo de comunicação.
										</p>
									</div>

									<div className="grid gap-4">
										<FormField
											control={form.control}
											name="whatsapp"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="font-semibold flex items-center gap-2">
														Número do WhatsApp
													</FormLabel>
													<FormControl>
														<InputMask
															mask="(__) _____-____"
															replacement={{ _: /\d/ }}
															component={Input}
															placeholder="(00) 00000-0000"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid gap-2">
											<Label htmlFor="whatsapp-message">
												Mensagem pré-configurada (padrão do sistema)
											</Label>
											<textarea
												id="whatsapp-message"
												className="min-h-[100px] w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed"
												defaultValue="Olá! Meu nome é {nome} e estou interessado(a) em adotar o animal {nome_animal}. Gostaria de saber mais informações sobre o processo de adoção."
												readOnly
											/>
											<p className="text-xs text-muted-foreground">
												As variáveis nome e nome_animal serão substituídas
												automaticamente com as informações do interessado.
											</p>
										</div>
									</div>
								</TabsContent>
								<TabsContent value="instagram" className="space-y-4 pt-4">
									<div className="bg-muted/50 p-4 rounded-md">
										<p className="text-sm">
											Ao utilizar o Instagram como método de contato, os
											interessados serão direcionados para enviar uma mensagem
											direta (DM) ao perfil da sua organização. Certifique-se
											de que seu perfil está configurado para receber
											mensagens de qualquer pessoa.
										</p>
									</div>

									<FormField
										control={form.control}
										name="instagram"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="font-semibold flex items-center gap-2">
													Perfil do Instagram
												</FormLabel>
												<FormControl>
													<Input
														id="instagram"
														placeholder="@caodominio"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</TabsContent>
							</form>
						</Form>
					</Tabs>
				)}
			</CardContent>
			<CardFooter>
				<Button onClick={form.handleSubmit(handleOnSubmit)} disabled={disabled}>
					{form.formState.isSubmitting ? "Salvando..." : "Salvar método de contato"}
				</Button>
			</CardFooter>
		</Card>
	)
}
