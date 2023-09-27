import { User } from "../entities/user";

export interface UserRepository {
  create(user: User): Promise<User>;
  findOne(payload: Partial<User>): Promise<User | undefined>;
}
