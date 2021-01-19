import { AxiosResponse } from 'axios'

export interface OrderDetailsData {
  orderId: number;
  foodName: string;
  foodImg: string;
  floor: number;
  wicketNumber: number;
  isPackage: boolean;
  isComplete: boolean;
  takeTime: string;
  number: number;
  totalPrice: number;
}

export type ResponseOrderDetails = AxiosResponse<{
  code: string;
  data: OrderDetailsData | null,
  msg: string;
}>
