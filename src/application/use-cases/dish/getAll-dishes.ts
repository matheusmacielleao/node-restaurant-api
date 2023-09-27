import { Dish } from "../../../domain/entities/dish";
import {
  DishRepository,
  GetAllDishesDto,
} from "../../../domain/repositories/dish-repository";

export class GetAllDishes {
  constructor(private readonly dishRepo: DishRepository) {}

  async get(payload: GetAllDishesDto): Promise<Dish[]> {
    const dishes = await this.dishRepo.getAll(payload);
    return dishes;
  }
}
