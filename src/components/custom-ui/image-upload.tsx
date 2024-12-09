import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ChangeEvent, MouseEvent } from "react"
import { When } from "../when"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

interface ImageUploadProps {
	value?: string
	onChange?: (value?: string) => void
	className?: string
	height?: string
}

export function ImageUpload({
	value,
	onChange,
	className,
	height = "h-[200px]",
}: ImageUploadProps) {
	const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				onChange?.(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onChange?.()
	}
	return (
		<div className={cn("relative", className)}>
			<Input
				type="file"
				accept="image/*"
				onChange={handleImageUpload}
				className="hidden"
				id="image-upload"
			/>
			<Label
				htmlFor={"image-upload"}
				className={cn(
					"group flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 border-gray-200 transition-colors hover:border-gray-300",
					height,
					value && "border-none hover:bg-gray-200",
				)}
			>
				<When
					condition={value?.length}
					fallback={<span className="text-3xl text-gray-300 group-hover:text-gray-400">+</span>}
				>
					<div className="relative w-full h-full">
						<Image
							src={value!}
							alt="Preview"
							layout="fill"
							objectFit="contain"
							className="rounded-lg"
						/>
						<Button
							size="icon"
							className="w-8 h-8 absolute top-2 right-2"
							variant="destructive"
							onClick={e => handleRemoveImage(e)}
						>
							<Trash size={16} />
						</Button>
					</div>
				</When>
			</Label>
		</div>
	)
}
