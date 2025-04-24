"use client"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Instagram, Facebook, Headset, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { createSocialAction } from "@/actions/settings/social/create"
import { useGetSocial } from "./mutations/use-social"
import { InputMask } from "@react-input/mask"
import { format } from "@react-input/mask"

const whatsappRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/
const socialSchema = z
	.object({
		instagram: z
			.string()
			.trim()
			.max(512, "Máximo de 512 caracteres")
			.optional(),
		whatsapp: z
			.string()
			.trim()
			.max(512, "Máximo de 512 caracteres")
			.optional(),
		facebook: z
			.string()
			.trim()
			.max(512, "Máximo de 512 caracteres")
			.optional(),
	})
	.superRefine((data, ctx) => {
		const isValidWhatsapp = whatsappRegex.test(data.whatsapp || "")
		if (!isValidWhatsapp) {
			ctx.addIssue({
				path: ["whatsapp"],
				code: "custom",
				message: "Digite um número de WhatsApp válido",
			})
		}
	})

const whatsappFormat = "(__) _____-____"
export function SocialSection() {
	const { data: socials, isLoading } = useGetSocial()
	const form = useForm<z.infer<typeof socialSchema>>({
		resolver: zodResolver(socialSchema),
		values: {
			instagram: socials?.find(s => s.type === "instagram")?.content || "",
			facebook: socials?.find(s => s.type === "facebook")?.content || "",
            whatsapp: format(socials?.find(s => s.type === "whatsapp")?.content || "", {
				mask: whatsappFormat,
				replacement: { _: /\d/ },
			}),
		},
	})
	const handleOnSubmit = async ({
		instagram,
		whatsapp,
		facebook,
	}: z.infer<typeof socialSchema>) => {
		await Promise.all([
			createSocialAction({ type: "instagram", content: instagram || "" }),
			createSocialAction({ type: "whatsapp", content: whatsapp || "" }),
			createSocialAction({ type: "facebook", content: facebook || "" }),
		])
		return
	}
	const disabled = isLoading || form.formState.isSubmitting
	return (
		<Card>
			<CardHeader>
				<CardTitle>Redes Sociais</CardTitle>
				<CardDescription>
					Configure os links das redes sociais da sua organização que serão exibidos no
					site.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{isLoading ? (
					<Loader2 className="h-6 w-6 animate-spin" />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleOnSubmit)}
							className="flex flex-col gap-6"
						>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="instagram"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-semibold flex items-center gap-2">
												<Instagram className="h-4 w-4 text-pink-500" />
												Instagram
											</FormLabel>
											<FormControl>
												<Input
													id="instagram"
													placeholder="https://instagram.com/caodominio"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="facebook"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-semibold flex items-center gap-2">
												<Facebook className="h-4 w-4 text-blue-600" />
												Facebook
											</FormLabel>
											<FormControl>
												<Input
													id="facebook"
													placeholder="https://facebook.com/caodominio"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="whatsapp"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-semibold flex items-center gap-2">
												<Headset className="h-4 w-4 text-green-500" />
												WhatsApp
											</FormLabel>
											<FormControl>
												<InputMask
													mask="(__) _____-____"
													replacement={{ _: /\d/ }}
													component={Input}
													id="whatsapp"
													placeholder="(00) 00000-0000"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</form>
					</Form>
				)}
			</CardContent>
			<CardFooter className="gap-2">
				<Button onClick={form.handleSubmit(handleOnSubmit)} disabled={disabled}>
					{form.formState.isSubmitting ? "Salvando..." : "Salvar redes sociais"}
				</Button>
                <Button onClick={() => form.reset()} variant="outline">
                    Cancelar
                </Button>
			</CardFooter>
		</Card>
	)
}
