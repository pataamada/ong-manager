"use client"
import { cn } from "@/lib/utils"
import { type ReactNode, forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	prependIcon?: ReactNode
	appendIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, prependIcon, appendIcon, type, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex items-center h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input",
					className,
				)}
			>
				{prependIcon}
				<input
					className="w-full h-full bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					ref={ref}
					type={type}
					{...props}
				/>
				{appendIcon}
			</div>
		)
	},
)
Input.displayName = "Input"

export { Input }
