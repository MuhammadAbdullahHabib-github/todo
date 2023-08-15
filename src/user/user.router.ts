import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import * as UserService from "./user.service";
export const userRouter = express.Router();
import { validationResult, param, check } from "express-validator";
import { IUser } from "./user.interface";

const saltRounds = 10;
const hashPasswordAsync = async (password: string): Promise<string> => {
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

const validateUserFields = [
  check("firstname").not().isEmpty().withMessage("Please enter firstname"),
  check("lastname").not().isEmpty().withMessage("Please enter lastname"),
  check("email").not().isEmpty().withMessage("Please enter email"),
  check("password").not().isEmpty().withMessage("Please enter password"),
];

const handleValdiaionResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ error: "Validation Failed", details: error.array() });
  }
  next();
};

const handleServerError = (res: Response, error: any) => {
  console.log(error.message);
  res.status(500).send(error.message);
};

userRouter.post(
  "/",
  [...validateUserFields, handleValdiaionResult],
  async (req: Request, res: Response) => {
    try {
      const { firstname, lastname, email, password }: IUser = req.body;
      const hashedPassword = await hashPasswordAsync(password);
      const newUser: Partial<IUser> = {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      };
      const user = UserService.createUser(newUser);
      res.status(201).json(user);
    } catch (error: any) {
      handleServerError(res, error);
    }
  }
);
