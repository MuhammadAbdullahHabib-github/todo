import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const handleServerError = (res: Response, error: any) => {
  console.log(error.message);
  res.status(500).send(error.message);
};

const middleware = (req: Request, res: Response, next: Function) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(decode);	
    next();
  } catch (error: any) {
    handleServerError(res, error);
    next();
  }
};
