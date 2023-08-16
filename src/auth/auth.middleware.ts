import { IDecodedUser, IAuthMiddlewareRequest } from "./auth.interface";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const handleServerError = (res: Response, error: any) => {
  console.log(error.message);
  res.status(500).send(error.message);
};

export const middleware = (
  req: IAuthMiddlewareRequest,
  res: Response,
  next: Function
) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as IDecodedUser;
    req.user = decoded.user;
    next();
  } catch (error: any) {
    handleServerError(res, error);
    next();
  }
};
