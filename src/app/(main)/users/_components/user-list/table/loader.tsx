import { Skeleton } from "@/components/ui/skeleton";

export function Loader() {
	return (
		<div className="flex flex-col gap-2">
			<Skeleton className="w-full h-12 rounded-none" />
			<Skeleton className="w-full h-[73px] rounded-none" />
			<Skeleton className="w-full h-[73px] rounded-none" />
			<Skeleton className="w-full h-[73px] rounded-none" />
			<Skeleton className="w-full h-[73px] rounded-none" />
		</div>
	)
}
