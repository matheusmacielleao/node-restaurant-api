import { Request, Response } from "express";
import { CreateUser } from "../../../application/use-cases/user/create-user";
import { GenerateUserToken } from "../../../application/use-cases/user/generate-user-token";

export class UserController {
  constructor(
    private createUser: CreateUser,
    private generateUserToken: GenerateUserToken
  ) {}
  async create(req: Request, res: Response) {
    try {
      const { nickname, password } = req.body;

      const newUser = await this.createUser.create(nickname, password);

      res.status(201).send(newUser);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async generateToken(req: Request, res: Response) {
    try {
      const { nickname, password } = req.body;

      const token = await this.generateUserToken.generate(nickname, password);

      res.status(201).send({ token });
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
