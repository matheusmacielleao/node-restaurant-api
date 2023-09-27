import { CryptographyService } from "../../application/services/cryptography-service";
import crypto from "crypto";

export class CryptoService implements CryptographyService {
  encode(password: string): string {
    const salt = process.env.CRYPTO_PASSWORD_SALT;
    const hash = crypto.createHash("sha256");
    hash.update(password + salt);
    const hashedPassword = hash.digest("hex");
    return hashedPassword;
  }
}
