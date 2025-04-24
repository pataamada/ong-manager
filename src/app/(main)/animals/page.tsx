import { Suspense } from "react"
import { AnimalsComponent } from "./_components"
import { Loader2 } from "lucide-react"

export default function Animals() {
	return (
		<Suspense fallback={<Loader2 className="h-6 w-6 animate-spin" />}>
			<AnimalsComponent />
		</Suspense>
	)
}
