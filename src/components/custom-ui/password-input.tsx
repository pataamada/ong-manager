"use client"
import { forwardRef, useState } from "react"
import { Icon } from "../icon"
import { Input, type InputProps } from "../ui/input"

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
	({ className, ...props }, ref) => {
		const [visible, setVisible] = useState(false)
		return (
			<Input
				ref={ref}
				className={className}
				type={visible ? "text" : "password"}
				appendIcon={
					<Icon
						size={20}
						name={visible ? "Eye" : "EyeOff"}
						className="cursor-pointer"
						onClick={() => setVisible(value => !value)}
					/>
				}
				{...props}
			/>
		)
	},
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
