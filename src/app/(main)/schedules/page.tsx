"use client"
import { listPaginate } from "@/services/Asaas/pix.service"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Schedules() {
	const [pix, setPix] = useState()

	const getPaginatePix = async () => {
		listPaginate().then(result => {
			if (result instanceof Error) {
			} else {
				console.log(result)
				setPix(result.data[0])
			}
		})
	}

	useEffect(() => {
		getPaginatePix()
	}, [])

	return (
		<div>
			{pix && (
				<div>
					<Image
						src={`data:image/png;base64,${pix.qrCode.encodedImage}`}
						alt="QR Code"
						width={300}
						height={300}
					/>

					<div className="w-4">{pix.qrCode.payload}</div>
				</div>
			)}
		</div>
	)
}
