import express , {NextFunction, Request, Response} from "express";
import * as UserService from "./user.service"
export const userRouter = express.Router();
import {validationResult,param,check} from 'express-validator';
import { IUser } from "./user.interface";

const validateUserFields = [
    check('firstname').not().isEmpty().withMessage('Please enter firstname'),
    check('lastname').not().isEmpty().withMessage('Please enter lastname'),
    check('email').not().isEmpty().withMessage('Please enter email'),
    check('password').not().isEmpty().withMessage('Please enter password'),
]

const handleValdiaionResult = (req:Request,res:Response,next:NextFunction) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({error:error.array()});
    }
    next();
};

const handleServerError = (res:Response,error:any) => {
    res.status(500).send(error.message);
};

userRouter.post('/', [...validateUserFields, handleValdiaionResult ], async (req:Request,res:Response) => {
    try{
       const newUser: IUser = req.body;
       await UserService.createUser(newUser);
       res.status(201).json(newUser);
    }catch(error:any){
        handleServerError(res,error)
    }
})





































