"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "nextjs-toploader/app"

export default function NotFound() {
	const router = useRouter()
	return (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<div className="text-center">
				<h4 className="text-h4">Página não encontrada</h4>
				<p className="text-subtitle-2">Parece que a página você acessou não existe :/</p>
			</div>
			<Button onClick={() => router.push("/dashboard")}>Voltar para a página inicial</Button>
		</div>
	)
}
