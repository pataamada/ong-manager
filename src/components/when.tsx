import type { ReactNode } from "react"

type WhenProps = {
	condition?: unknown
	children?: ReactNode
	fallback?: ReactNode
}
export function When({ condition, children, fallback }: WhenProps) {
	return condition ? children : fallback || null
}
