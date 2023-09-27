import { Dish } from "./dish";
import { User } from "./user";

export interface Rating {
  rating: number;
  user: User;
  dish: Dish;
}
