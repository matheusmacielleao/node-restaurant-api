import { Repository } from "typeorm";
import { CreateDishDto, Dish } from "../../../../domain/entities/dish";
import {
  DishRepository,
  GetAllDishesDto,
} from "../../../../domain/repositories/dish-repository";
import { DishModel } from "../models/dish.model";

export class TypeOrmDishRepository implements DishRepository {
  constructor(private readonly dishModelRepo: Repository<DishModel>) {}
  async delete(id: number): Promise<void> {
    await this.dishModelRepo.delete({ id });
  }
  async update(id: number, payload: Partial<Dish>): Promise<Dish> {
    const updatedDish = await this.dishModelRepo
      .update({ id }, payload)
      .then((response) => {
        console.log(response);
        return response.raw as Dish;
      });

    return updatedDish;
  }
  async getAll(payload: GetAllDishesDto): Promise<Dish[]> {
    const { offset, limit, ...data } = payload;
    return this.dishModelRepo.find({
      where: data,
      skip: offset,
      take: limit,
      relations: {
        ratings: true,
      },
    });
  }

  async create(dishDto: CreateDishDto): Promise<Dish> {
    return this.dishModelRepo.save(dishDto);
  }

  async findOne(payload: Partial<Dish>): Promise<Dish | undefined> {
    const dish = await this.dishModelRepo.findOne({
      where: payload,
      relations: { ratings: true },
    });

    if (dish === null) {
      return undefined;
    }

    return dish;
  }
}
