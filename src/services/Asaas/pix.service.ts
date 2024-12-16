import { Api } from "@/lib/axiosConfig";
import type { IClient } from "@/types/Asaas/Customer";
import type { IPagination, IPaginationAsaas } from "@/types/Asaas/Pagination";

const listPaginate = async (): Promise<IPagination<IClient> | Error> => {
  try {
    const urlRelative = `/pix`;
    const { data } = await Api.get<IPaginationAsaas<IClient>>(urlRelative);

    if (data)
     return data

    return new Error('Erro ao listar pix.');
  } catch (error: any) {
    console.log(error);

    return new Error((error as { message: string }).message || 'Erro ao listar pix.');
  }
};

export const PixService = {
  listPaginate,
};