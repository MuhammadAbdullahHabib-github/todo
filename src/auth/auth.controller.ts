import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import * as authService from "./auth.service";

export const validateLogin = [
    check("email").isEmail().withMessage("Please include a valid email"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ];
  
export const handleValidationError = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

const handleServerError = (res: Response, error: any) => {
  console.log(error.message);
  res.status(500).send(error.message);
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginUser = req.body;
    const loginResult = await authService.login(loginUser);
    res.status(200).json(loginResult);
  } catch (error: any) {
    handleServerError(res, error);
  }
};


