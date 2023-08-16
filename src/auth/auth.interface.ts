import { Request } from "express";
export interface IUserAuth {
  email: string;
  password: string;
}

export interface IDecodedUser {
  user: string;
}

export interface IAuthMiddlewareRequest extends Request {
  user?: string;
}
