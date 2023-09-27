import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Rating } from "../../../../domain/entities/rating";
import { Dish } from "../../../../domain/entities/dish";
import { User } from "../../../../domain/entities/user";
import { UserModel } from "./user.model";
import { DishModel } from "./dish.model";

@Entity()
export class RatingModel implements Rating {
  @Column()
  rating!: number;
  @PrimaryColumn("simple-json")
  @ManyToOne(() => UserModel, (user: UserModel) => user.ratings, {
    onDelete: "CASCADE",
  })
  user!: User;
  @PrimaryColumn("simple-json")
  @ManyToOne(() => DishModel, (dish: DishModel) => dish.ratings, {
    onDelete: "CASCADE",
  })
  dish!: Dish;
}
