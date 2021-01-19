import { ResponseCommon } from '@/utils/type'

export type ResponseAddToOrder = ResponseCommon<null>

export interface AddToOrderProps {
  foodId: number;
  foodName: string;
  foodPrice: number;
}
