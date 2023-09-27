export interface AuthTokenService {
  generateToken(nickname: string, password: string): string;
  validateToken(password: string): any;
}
