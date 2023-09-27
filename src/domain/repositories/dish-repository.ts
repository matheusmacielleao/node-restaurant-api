import { CreateDishDto, Dish } from "../entities/dish";

export interface DishRepository {
  create(dishDto: CreateDishDto): Promise<Dish>;
  findOne(payload: Partial<Dish>): Promise<Dish | undefined>;
  getAll(payload: GetAllDishesDto): Promise<Dish[]>;
  delete(id: number): Promise<void>;
  update(id: number, payload: Partial<Dish>): Promise<Dish>;
}

export interface GetAllDishesDto extends Partial<Dish> {
  limit?: number;
  offset?: number;
}
