export interface IResponseErrorAsaas {
  response: {
    data: {
      errors: IErrorAsaas[]
    };
  };
}
export interface IErrorAsaas {
	code: string
	description: string
}
