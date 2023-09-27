import { CreateUser } from "../application/use-cases/user/create-user";
import { GenerateUserToken } from "../application/use-cases/user/generate-user-token";
import { UserModel } from "../infra/databases/typeorm/models/user.model";
import { TypeOrmUserRepository } from "../infra/databases/typeorm/repositories/typeorm-user.repository";
import { TypeOrmDataSource } from "../infra/databases/typeorm/typeorm.config";
import { CryptoService } from "../infra/services/crypto-service";
import { JwtAuthTokenService } from "../infra/services/jwt-auth-service";

const tokenService = new JwtAuthTokenService();
const cryptoService = new CryptoService();
const modelRepo = TypeOrmDataSource.getRepository(UserModel);
const userRepo = new TypeOrmUserRepository(modelRepo);

export abstract class UserUseCasesFactory {
  static buildCreateUser() {
    const createUser = new CreateUser(userRepo, cryptoService);
    return createUser;
  }

  static buildGenereateUserToken() {
    const generateToken = new GenerateUserToken(
      userRepo,
      tokenService,
      cryptoService
    );
    return generateToken;
  }
}
