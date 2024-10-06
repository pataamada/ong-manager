"use client"
import { forwardRef, useState } from "react"
import { Input, type InputProps } from "../ui/input"
import { Icon } from "../icon"

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, "type">>(({ className, ...props }, ref) => {
	const [visible, setVisible] = useState(false)
	return (
		<Input
			ref={ref}
			className={className}
			type={visible ? "text" : "password"}
			{...props}
			rightIcon={
				<Icon
					size={20}
					name={visible ? "Eye" : "EyeOff"}
					onClick={() => setVisible(value => !value)}
				/>
			}
		/>
	)
})
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
