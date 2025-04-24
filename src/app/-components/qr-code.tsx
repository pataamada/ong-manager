"use client"
import { Icon } from "@iconify/react"
import { useToast } from "@/hooks/use-toast"
import ReactQrCode from "react-qr-code"
import { cn } from "@/lib/utils"
import { parsePIXCode } from "@/utils/extract"

type QrCodeProps = { qrCode: string; className?: string }
export function QrCode({ qrCode, className }: QrCodeProps) {
	const { toast } = useToast()

	const copyQrCode = () => {
		navigator.clipboard.writeText(qrCode).then(() => {
			toast({
				title: "Código copiado",
				description: "O código PIX foi copiado para a área de transferência!",
				variant: "default",
			})
		})
	}
	const info = parsePIXCode(qrCode)
	return (
		<div
			className={cn("relative w-full h-full cursor-pointer aspect-[233/219] flex flex-col items-center justify-center ", className)}
			onClick={copyQrCode}
		>
			<ReactQrCode size={256} className="lg:w-[168px] w-[148px] lg:h-[168px] h-[148px]  bg-white rounded-lg p-2" value={qrCode} viewBox="0 0 256 256" />
			<div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ">
				<Icon icon="akar-icons:copy" className="text-white w-6 h-6" />
			</div>
			<span className="text-white">{info["59"] as string}</span>
		</div>
	)
}