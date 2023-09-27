import { AuthTokenService } from "../../application/services/auth-token-service";

import { sign, verify } from "jsonwebtoken";

export class JwtAuthTokenService implements AuthTokenService {
  generateToken(nickname: string, password: string): string {
    if (!process.env.TOKEN_SECRET) {
      throw new Error("token secret not seted");
    }
    const token = sign(
      {
        nickname,
        password,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: 3600,
      }
    );

    return token;
  }
  validateToken(token: string): any {
    if (!process.env.TOKEN_SECRET) {
      throw new Error("token secret not seted");
    }
    const tokenOnly = token.split(" ")[1];
    return verify(tokenOnly, process.env.TOKEN_SECRET);
  }
}
