import { UserRepository } from "../../../domain/repositories/user-repository";
import { AuthTokenService } from "../../services/auth-token-service";
import { CryptographyService } from "../../services/cryptography-service";

export class GenerateUserToken {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authTokenService: AuthTokenService,
    private readonly cryptoService: CryptographyService
  ) {}

  async generate(nickname: string, password: string): Promise<string> {
    const user = await this.userRepo.findOne({
      nickname,
      password: this.cryptoService.encode(password),
    });

    if (!user) {
      throw new Error("Not Authorized");
    }

    const token = this.authTokenService.generateToken(nickname, password);

    return token;
  }
}
