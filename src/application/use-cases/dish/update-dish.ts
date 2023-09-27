import { Dish } from "../../../domain/entities/dish";
import { DishRepository } from "../../../domain/repositories/dish-repository";

export class UpdateDish {
  constructor(private readonly dishRepo: DishRepository) {}

  async update(id: number, payload: Partial<Omit<Dish, "ratings">>) {
    const dishExists = await this.dishRepo.findOne({ id });

    if (!dishExists) {
      throw new Error("Dish Specified doesnt exists");
    }

    await this.dishRepo.update(id, payload);

    return { ...payload, ...dishExists };
  }
}
