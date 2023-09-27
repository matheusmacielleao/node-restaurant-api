import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "../../../../domain/entities/user";
import { RatingModel } from "./rating.model";

@Entity()
export class UserModel implements User {
  @PrimaryColumn()
  nickname!: string;
  @Column()
  password!: string;
  @OneToMany(() => RatingModel, (RatingModel: RatingModel) => RatingModel.user)
  ratings!: RatingModel[];
}
