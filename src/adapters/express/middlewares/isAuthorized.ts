import { NextFunction, Request, Response } from "express";
import { JwtAuthTokenService } from "../../../infra/services/jwt-auth-service";

const tokenService = new JwtAuthTokenService();
export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("");
    }
    tokenService.validateToken(req.headers.authorization as string);
    next();
  } catch (error) {
    res.status(403).send({ message: "Not Authorized" });
  }
};
