import { CreateDishDto, Dish } from "../../../domain/entities/dish";
import { DishRepository } from "../../../domain/repositories/dish-repository";

export class CreateDish {
  constructor(private readonly dishRepository: DishRepository) {}

  async create(
    name: string,
    description: string,
    image_url: string,
    price: number
  ): Promise<Dish> {
    await Promise.all([
      this.verifyUniqueDescription(description),
      this.verifyUniqueName(name),
    ]);

    const newDish: CreateDishDto = {
      name,
      description,
      image_url,
      price,
    };

    return this.dishRepository.create(newDish);
  }

  private async verifyUniqueName(name: string) {
    const user = await this.dishRepository.findOne({ name });

    if (user) {
      throw new Error(`A dish named ${name} already exists`);
    }
  }
  private async verifyUniqueDescription(description: string) {
    const user = await this.dishRepository.findOne({ description });

    if (user) {
      throw new Error("description already taken");
    }
  }
}
