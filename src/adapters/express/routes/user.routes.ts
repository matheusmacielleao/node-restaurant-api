import express from "express";
import { UserController } from "../handlers/user.controller";
import { UserUseCasesFactory } from "../../../config/user-usecases.factory";
import {
  postAuthValidation,
  postUserValidation,
} from "../middlewares/validations/user-controller.validations";

const createUser = UserUseCasesFactory.buildCreateUser();
const generateToken = UserUseCasesFactory.buildGenereateUserToken();

const userController = new UserController(createUser, generateToken);

export const userRouther = express.Router();

userRouther.post("/users", postUserValidation, async (req, res) => {
  await userController.create(req, res);
});

userRouther.post("/auth", postAuthValidation, async (req, res) => {
  await userController.generateToken(req, res);
});
