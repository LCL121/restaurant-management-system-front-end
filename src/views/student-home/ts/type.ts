export interface Food {
  foodId: number;
  name: string;
  price: number;
  taste: string;
  wicketId: number;
  image: string;
}

export type FoodList = Food[]
