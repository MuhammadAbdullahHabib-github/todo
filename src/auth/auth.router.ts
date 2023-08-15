import express, {Request,Response} from "express";
export const authRouter = express.Router();

import {login} from "./auth.controller";
import {validateLogin,handleValidationError} from "./auth.controller";


// @route POST /api/auth
// @desc User Login
// @access Public

authRouter.post("/", [...validateLogin,handleValidationError] , login);


