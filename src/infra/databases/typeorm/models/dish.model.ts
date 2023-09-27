import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "../../../../domain/entities/dish";
import { RatingModel } from "./rating.model";

@Entity()
export class DishModel implements Dish {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @Column()
  image_url!: string;
  @Column()
  price!: number;
  @OneToMany(() => RatingModel, (RatingModel: RatingModel) => RatingModel.dish)
  ratings!: RatingModel[];
}
