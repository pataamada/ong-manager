import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface Option {
	value: string
	label: string
}

interface CustomSelectProps {
	value?: string
	defaultValue?: string
	options: Option[]
	placeholder?: string
	label?: string
	className?: string
	onChange?: (value: string) => void
}

export function CustomSelect({
	value,
	defaultValue,
	options,
	placeholder = "Select an option",
	label,
	className = "w-[180px]",
	onChange,
}: CustomSelectProps) {
	return (
		<Select
			value={value}
			defaultValue={defaultValue ?? options?.[0]?.value}
			onValueChange={onChange}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{label && <SelectLabel>{label}</SelectLabel>}
					{options.map(option => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
