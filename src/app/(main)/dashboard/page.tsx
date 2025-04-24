import { Suspense } from "react"
import { DashboardComponent } from "./_components"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
	return <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin" />}>
		<DashboardComponent />
	</Suspense>
}
