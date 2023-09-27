import { Request, Response } from "express";
import { CreateDish } from "../../../application/use-cases/dish/create-dish";
import { GetAllDishes } from "../../../application/use-cases/dish/getAll-dishes";
import { DeleteDish } from "../../../application/use-cases/dish/delete-dish";
import { RateDish } from "../../../application/use-cases/dish/rate-dish";
import { AuthTokenService } from "../../../application/services/auth-token-service";
import { UpdateDish } from "../../../application/use-cases/dish/update-dish";

export class DishController {
  constructor(
    private createDish: CreateDish,
    private getAllDishes: GetAllDishes,
    private deleteDish: DeleteDish,
    private rateDish: RateDish,
    private updateDish: UpdateDish,
    private tokenService: AuthTokenService
  ) {}
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dishes = await this.getAllDishes.get({ id: Number(id) });

      if (dishes[0] == undefined) {
        throw new Error("dish not found");
      }

      res.status(200).send(dishes[0]);
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, image_url, price } = req.body;

      const updatedDish = await this.updateDish.update(Number(id), {
        name,
        description,
        image_url,
        price,
      });

      res.status(200).send(updatedDish);
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  }

  async rate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { rating } = req.body;

      const decodedToken = this.tokenService.validateToken(
        req.headers.authorization || ""
      ) as { nickname: string };

      const newRating = await this.rateDish.rate(
        decodedToken.nickname,
        Number(id),
        rating
      );

      res.status(201).send(newRating);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, description, image_url, price } = req.body;

      const newDish = await this.createDish.create(
        name,
        description,
        image_url,
        price
      );

      res.status(201).send(newDish);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.deleteDish.byId(Number(id));

      res.status(204).send({});
    } catch (error: any) {
      res.status(404).send({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { limit, offset } = req.query;

      const dishes = await this.getAllDishes.get({
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      });

      res.status(200).send(dishes);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }
}
