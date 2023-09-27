import { Rating } from "./rating";

export interface Dish {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  ratings: Rating[];
}

export interface CreateDishDto {
  name: string;
  description: string;
  image_url: string;
  price: number;
}
