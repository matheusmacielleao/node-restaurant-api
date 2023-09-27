import { Repository } from "typeorm";
import { User } from "../../../../domain/entities/user";
import { UserRepository } from "../../../../domain/repositories/user-repository";
import { UserModel } from "../models/user.model";

export class TypeOrmUserRepository implements UserRepository {
  constructor(private readonly UserModelRepo: Repository<UserModel>) {}

  async create(user: User): Promise<User> {
    return this.UserModelRepo.save(user);
  }

  async findOne(payload: Partial<User>): Promise<User | undefined> {
    const User = await this.UserModelRepo.findOne({ where: payload });

    if (User === null) {
      return undefined;
    }

    return User;
  }
}
