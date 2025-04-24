"use client"

import { useEffect } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import QRCode from "react-qr-code"
import { SocialSection } from "./social-section"
import { AdoptionMethod } from "./adoption-method"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateSettings } from "@/services/settings.service"
import { useSettings } from "./mutations/use-settings"
import { Textarea } from "@/components/ui/textarea"
import { Image as ImageIcon, Loader2 } from "lucide-react"

const schema = z
	.object({
		isUsingAsaas: z.boolean(),
		qrCode: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// Only validate qrCode if Asaas integration is disabled
		if (!data.isUsingAsaas && !data.qrCode) {
			ctx.addIssue({
				path: ["qrCode"],
				code: "custom",
				message: "Coloque o código do QR Code",
			})
		}
	})

export default function SettingsPage() {
	const { data: settings, isLoading } = useSettings()
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		values: {
			isUsingAsaas: settings?.paymentMethod?.isUsingAsaas ?? true,
			qrCode: settings?.paymentMethod?.qrCode || "",
		},
	})
	const handleOnSubmit = async ({ isUsingAsaas, qrCode }: z.infer<typeof schema>) => {
		await updateSettings({
			id: settings?.id || "",
			paymentMethod: {
				isUsingAsaas,
				qrCode,
			},
		})
	}
	const disabled =
		form.formState.isSubmitting || Object.keys(form.formState.errors).length > 0 || isLoading

	const qrCode = useWatch({
		control: form.control,
		name: "qrCode",
	})
	const isUsingAsaas = useWatch({
		control: form.control,
		name: "isUsingAsaas",
	})

	useEffect(() => {
		if (isUsingAsaas) {
			form.clearErrors("qrCode")
		}
	}, [isUsingAsaas, form])

	return (
		<div className="flex flex-col  space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Método de Pagamento</CardTitle>
					<CardDescription>
						Configure o QR Code PIX que será usado para receber pagamentos de adoção.
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
								<div className="flex items-center space-x-2">
									<FormField
										control={form.control}
										name="isUsingAsaas"
										render={({ field }) => (
											<FormItem className="flex items-center flex-row-reverse gap-2 justify-center">
												<FormLabel className="font-semibold flex items-center gap-2">
													Usar integração com Asaas
												</FormLabel>
												<FormControl className="mt-0">
													<Switch
														id="asaas-integration"
														checked={field.value}
														onCheckedChange={field.onChange}
														className="!mt-0"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="bg-muted/50 p-4 rounded-md">
									<p className="text-sm">
										Por padrão, utilizamos a integração com o Asaas para
										gerenciar os pagamentos. Isso permite que todos os
										pagamentos sejam automaticamente registrados no dashboard
										financeiro do sistema, facilitando o controle e a gestão das
										doações e taxas de adoção.
									</p>
								</div>

								{!isUsingAsaas && (
									<div className="space-y-2">
										<p className="text-sm text-muted-foreground">
											Se preferir usar seu próprio QR Code PIX, gere o código
											QR Code no aplicativo do seu banco e copie o código e
											cole aqui.
										</p>
										<div className="flex flex-1 items-start gap-4">
											{qrCode ? (
												<QRCode
													size={256}
													className="w-40 h-40"
													value={qrCode}
													viewBox="0 0 256 256"
												/>
											) : (
												<div className="flex flex-col items-center justify-center w-40 h-40 bg-neutral-200 rounded-md gap-2">
													<ImageIcon className="w-10 h-10 text-neutral-500" />
													<p className="text-xs text-muted-foreground text-center">
														Seu QR Code ainda aparecerá aqui
													</p>
												</div>
											)}
											<FormField
												control={form.control}
												name="qrCode"
												render={({ field }) => (
													<FormItem className="flex-1">
														<FormLabel className="font-semibold flex items-center gap-2">
															QR Code
														</FormLabel>
														<FormControl className="flex-1">
															<Textarea
																id="qrCode"
																placeholder=""
																className="resize-none"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								)}
							</form>
						</Form>
					)}
				</CardContent>

				<CardFooter>
					<Button onClick={form.handleSubmit(handleOnSubmit)} disabled={disabled}>
						{form.formState.isSubmitting ? "Salvando..." : "Salvar configurações"}
					</Button>
				</CardFooter>
			</Card>

			<SocialSection />
			<AdoptionMethod />
		</div>
	)
}
