export interface IPix {
	id: string
	key: string
	type: string
	status: string
	dateCreated: string
	canBeDeleted: boolean
	cannotBeDeletedReason: null
	qrCode: QrCode
}

interface QrCode {
	encodedImage: string
	payload: string
}
