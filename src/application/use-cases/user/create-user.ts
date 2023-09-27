import { UserRepository } from "../../../domain/repositories/user-repository";
import { CryptographyService } from "../../services/cryptography-service";

export class CreateUser {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly cryptoService: CryptographyService
  ) {}

  async create(nickname: string, password: string): Promise<void> {
    await this.uniqueNickname(nickname);

    await this.userRepo.create({
      nickname,
      password: this.encodePassword(password),
    });
  }

  private encodePassword(password: string) {
    return this.cryptoService.encode(password);
  }

  private async uniqueNickname(nickname: string) {
    const user = await this.userRepo.findOne({ nickname });
    if (user) {
      throw new Error(`User with nickname ${nickname} already exists`);
    }
  }
}
