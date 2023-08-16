import { Request, Response, NextFunction } from "express";
import { ITodo } from './todo.interface';
import { IAuthMiddlewareRequest } from './../auth/auth.interface';
import * as TodoService from "./todo.service";
import { param,check, validationResult } from 'express-validator';

export const validateMongoIdParam = param("id")
  .isMongoId()
  .withMessage("ID should be a valid mongoID");

export const validateTodoFields = [
  check("title").not().isEmpty().withMessage("Please enter title"),
  check("description").not().isEmpty().withMessage("Please enter description"),
];

export const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ error: error.array() });
  }
  next();
};

const handleNotFoundError = (res: Response) => {
  return res.status(404).send("Resource not found");
};

const handleServerError = (res: Response, error: any) => {
  console.error(error);
  res.status(500).send("Internal server error");
};


export const createController = async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const todo: ITodo = req.body;
      todo.user_id = req.user;
      const newTodo = await TodoService.createTodo(todo);
      res.status(201).json(newTodo);
    } catch (error) {
      handleServerError(res, error);
    }
}


export const findController = async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const id: string = req.params.id;
      const user_id = req.user;
      const todo: ITodo | null = await TodoService.find(id, user_id);
      if (!todo) {
        handleNotFoundError(res);
      }
      return res.status(200).json(todo);
    } catch (error: any) {
      handleServerError(res, error);
    }
  }

export const findAllController = async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const user_id = req.user;
      const allTodos: ITodo[] | null = await TodoService.findAll(user_id);
      if (!allTodos) {
        handleNotFoundError(res);
      }
      return res.status(200).json(allTodos);
    } catch (error: any) {
      handleServerError(res, error);
    }
  }

export const updateController =  async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const user_id = req.user;
      const updatedItem = await TodoService.update(id, updatedTodo, user_id);
      if (!updatedItem) {
        handleNotFoundError(res);
      }
      res.status(200).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }

  export const patchController =  async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const user_id = req.user;
      const updatedItem = await TodoService.patch(id, updatedTodo, user_id);
      if (!updatedItem) {
        handleNotFoundError(res);
      }
      res.status(204).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }

  export const deleteController =  async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const id: string = req.params.id;
      const user_id = req.user;
      const deleteItem = await TodoService.remove(id, user_id);
      if (deleteItem === null) {
        handleNotFoundError(res);
      }
      res.status(204);
    } catch (error) {
      handleServerError(res, error);
    }
  }