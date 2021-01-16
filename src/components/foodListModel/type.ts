export interface FoodListItemProps {
  imgSrc: string;
  foodId: number;
  foodName: string;
  foodPrice: number;
}

export type FoodListModelProps = FoodListItemProps[]
