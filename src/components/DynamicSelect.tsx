import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

// ... imports remain the same ...

interface Option {
	value: string
	label: string
}

interface DynamicSelectProps {
	options: Option[]
	placeholder?: string
	label?: string
	className?: string
	onChange?: (value: string) => void
}

export function DynamicSelect({
	options,
	placeholder = "Select an option",
	label,
	className = "w-[180px]",
	onChange,
}: DynamicSelectProps) {
	return (
		<Select defaultValue={options[0].value} onValueChange={onChange}>
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
