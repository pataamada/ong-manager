import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { forwardRef, type ChangeEvent, type MouseEvent } from "react"
import { When } from "../when"
import { Button } from "../ui/button"
import { Trash } from "lucide-react"

interface ImageUploadProps {
	value?: string | File
	onChange?: (value?: string | File) => void
	onRemoveImage?: () => void
	className?: string
	height?: string
	objectFit?: "cover" | "contain"
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
	(
		{ value, onChange, onRemoveImage, className, height = "h-[200px]", objectFit = "contain" },
		ref,
	) => {
		const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0]
			if (file) {
				onChange?.(file)
			}
		}
		const handleRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
			onChange?.()
			onRemoveImage?.()
			e.stopPropagation()
		}
		const hasValue = value || (typeof value === "string" && value?.length > 0)
		return (
			<div className={cn("relative rounded-lg", className)}>
				<Input
					ref={ref}
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="hidden"
					id="image-upload"
				/>
				<Label
					htmlFor={"image-upload"}
					className={cn(
						"group flex cursor-pointer items-center rounded-lg justify-center border-2 border-dashed bg-gray-100 border-gray-200 transition-colors hover:border-gray-300",
						height,
						value && "border-none hover:bg-gray-200",
					)}
				>
					<When
						condition={hasValue}
						fallback={
							<span className="text-3xl text-gray-300 group-hover:text-gray-400">
								+
							</span>
						}
					>
						<div className="relative w-full h-full rounded-lg">
							<Image
								src={
									value instanceof File
										? URL.createObjectURL(value)
										: (value as string)
								}
								alt="Preview"
								fill
								className={cn(
									"rounded-lg",
									objectFit === "cover" && "object-cover",
									objectFit === "contain" && "object-contain",
								)}
							/>
						</div>
					</When>
				</Label>
				<When condition={value || (typeof value === "string" && value?.length)}>
					<Button
						size="icon"
						className="w-8 h-8 absolute top-2 right-2"
						variant="destructive"
						type="button"
						onClick={e => handleRemoveImage(e)}
					>
						<Trash size={16} />
					</Button>
				</When>
			</div>
		)
	},
)

ImageUpload.displayName = "ImageUpload"

export { ImageUpload }
