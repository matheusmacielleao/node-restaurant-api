import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const postUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new Error("Not Authorized");
  }
  const schema = Joi.object({
    body: Joi.object({
      nickname: Joi.string().min(3).trim().required(),
      password: Joi.string().min(3).trim().required(),
    }),
  });
  const { error } = schema.validate({ body: req.body }, { abortEarly: false });
  if (error) return res.status(400).send({ message: error.message });
  next();
};

export const postAuthValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(400).send({ message: "Not Authorized" });
  }
  const schema = Joi.object({
    body: Joi.object({
      nickname: Joi.string().min(3).trim().required(),
      password: Joi.string().min(3).trim().required(),
    }),
  });
  const { error } = schema.validate({ body: req.body }, { abortEarly: false });
  if (error) return res.status(400).send({ message: error.message });
  next();
};
