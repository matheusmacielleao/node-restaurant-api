import express from "express";
import { DishController } from "../handlers/dish.controller";
import { DishUseCasesFactory } from "../../../config/dish-usecases.factory";
import { isAuthorized } from "../middlewares/isAuthorized";
import { JwtAuthTokenService } from "../../../infra/services/jwt-auth-service";
import {
  deleteDishValidation,
  getOneDishValidation,
  postDishValidation,
  rateDishValidation,
  updateDishValidation,
} from "../middlewares/validations/dish-controller.validations";
import { rateLimiter } from "../middlewares/rateLimiter";

const createDish = DishUseCasesFactory.buildCreateDishUseCase();
const getAllDishes = DishUseCasesFactory.buildGetAllDishesUseCase();
const deleteDish = DishUseCasesFactory.buildDeleteDish();
const rateDish = DishUseCasesFactory.buildRateDish();
const updatedDish = DishUseCasesFactory.buildUpdateDish();
const tokenService = new JwtAuthTokenService();

const dishController = new DishController(
  createDish,
  getAllDishes,
  deleteDish,
  rateDish,
  updatedDish,
  tokenService
);

export const dishRouter = express.Router();

dishRouter.post(
  "/dishes",
  rateLimiter,
  isAuthorized,
  postDishValidation,
  async (req, res) => {
    await dishController.create(req, res);
  }
);

dishRouter.post(
  "/dishes/:id/rating",
  rateLimiter,
  isAuthorized,
  rateDishValidation,
  async (req, res) => {
    await dishController.rate(req, res);
  }
);

dishRouter.get("/dishes", rateLimiter, isAuthorized, async (req, res) => {
  await dishController.getAll(req, res);
});

dishRouter.get(
  "/dishes/:id",
  rateLimiter,
  isAuthorized,
  getOneDishValidation,
  async (req, res) => {
    await dishController.getOne(req, res);
  }
);

dishRouter.patch(
  "/dishes/:id",
  rateLimiter,
  updateDishValidation,
  isAuthorized,
  async (req, res) => {
    await dishController.update(req, res);
  }
);

dishRouter.delete(
  "/dishes/:id",
  rateLimiter,
  isAuthorized,
  deleteDishValidation,
  async (req, res) => {
    await dishController.delete(req, res);
  }
);
