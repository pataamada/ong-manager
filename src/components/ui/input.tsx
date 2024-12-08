"use client"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { type ReactNode, forwardRef } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	leftIcon?: ReactNode
	rightIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, leftIcon, rightIcon, type, ...props }, ref) => {
		return (
			<div
				className={cn(
					"flex items-center h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 group container-input",
					className,
				)}
			>
				{leftIcon}
				<input
					className="w-full h-full bg-transparent focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground group-[.container-input]:focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					ref={ref}
					type={type}
					{...props}
				/>
				{rightIcon}
			</div>
		)
	},
)
Input.displayName = "Input"

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[16px]" />
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    );
  },
);

Search.displayName = "Search";

export { Input, Search }
