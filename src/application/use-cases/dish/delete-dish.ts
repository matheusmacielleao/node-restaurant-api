import { DishRepository } from "../../../domain/repositories/dish-repository";

export class DeleteDish {
  constructor(private readonly dishRepo: DishRepository) {}

  async byId(id: number): Promise<void> {
    const dishExists = await this.dishRepo.findOne({ id });

    if (!dishExists) {
      throw new Error(`Dish with id : ${id} doesn't exist`);
    }
    await this.dishRepo.delete(id);
  }
}
