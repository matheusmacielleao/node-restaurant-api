import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const postDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    description: Joi.string().min(3).trim().required(),
    image_url: Joi.string().min(3).trim().required(),
    price: Joi.number().min(0).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).send({ message: error.message });
  next();
};

export const updateDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    body: Joi.object({
      name: Joi.string().min(3).trim(),
      description: Joi.string().min(3).trim(),
      image_url: Joi.string().min(3).trim(),
      price: Joi.number().min(0),
    }),
    params: Joi.object({
      id: Joi.number().min(0).required(),
    }),
  });
  const { error } = schema.validate(
    { body: req.body, params: req.params },
    { abortEarly: false }
  );
  if (error) return res.status(400).send({ message: error.message });
  next();
};

export const deleteDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    params: Joi.object({
      id: Joi.number().min(0).required(),
    }),
  });
  const { error } = schema.validate(
    { params: req.params },
    { abortEarly: false }
  );
  if (error) return res.status(400).send({ message: error.message });
  next();
};

export const getOneDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    params: Joi.object({
      id: Joi.number().min(0).required(),
    }),
  });
  const { error } = schema.validate(
    { params: req.params },
    { abortEarly: false }
  );
  if (error) return res.status(400).send({ message: error.message });
  next();
};

export const rateDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    body: Joi.object({
      rating: Joi.number().min(0).required(),
    }),
    params: Joi.object({
      id: Joi.number().min(0).required(),
    }),
  });
  const { error } = schema.validate(
    { body: req.body, params: req.params },
    { abortEarly: false }
  );
  if (error) return res.status(400).send({ message: error.message });
  next();
};
