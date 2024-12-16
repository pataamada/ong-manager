import type { SVGProps } from "react"

export function CleaningItems(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
			aria-label="Cleaning Items"
			{...props}
		>
			<path d="m13 11 9-9" />
			<path d="M14.6 12.6c.8.8.9 2.1.2 3L10 22l-8-8 6.4-4.8c.9-.7 2.2-.6 3 .2Z" />
			<path d="m6.8 10.4 6.8 6.8" />
			<path d="m5 17 1.4-1.4" />
		</svg>
	)
}
