import { Lot } from '@prisma/client';
import { axiosInstance } from './instance';

export type Props = {
  page?: number,
  pageSize?: number
}
export type Response = {
  data: Lot[];
  meta: {
    page: number,
    pageSize: number,
    totalCount: number,
    totalPages: number
  },
}

export const getLots = async (params: Props) => {
  const { data } = await axiosInstance.get<Response>('/lot/list', { params });
  return data;
};