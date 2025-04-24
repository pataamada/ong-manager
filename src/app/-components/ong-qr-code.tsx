import { getSettings } from "@/services/settings.service"
import { QrCode } from "./qr-code"
export async function OngQrCode() {
	const settings = await getSettings()
    if(!settings.paymentMethod?.qrCode) {
        return null
    }
	return (
		<QrCode
			qrCode={settings.paymentMethod.qrCode}
		/>
	)
}