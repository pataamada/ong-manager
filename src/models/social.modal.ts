export interface Social {
	id: string
	type: string
	content: string
}

export interface SocialCreatePayload extends Omit<Social, "id"> {}
