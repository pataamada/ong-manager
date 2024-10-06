import { icons, type LucideProps } from "lucide-react"

export type IconName = keyof typeof icons
export type IconProps = Omit<LucideProps, "name"> & { name: IconName }
export function Icon({ name, color, size }: IconProps) {
	const LucideIcon = icons[name]
	return <LucideIcon color={color} size={size} />
}
