import { IAuthMiddlewareRequest } from './../auth/auth.interface';
import express, { NextFunction, Request, Response } from "express";
import { middleware } from "./../auth/auth.middleware";
import * as TodoService from "./todo.service";
import { param, check, validationResult } from "express-validator";
import { ITodo } from "./todo.interface";

export const todoRouter = express.Router();

const validateMongoIdParam = param("id")
  .isMongoId()
  .withMessage("ID should be a valid mongoID");

const validateTodoFields = [
  check("title").not().isEmpty().withMessage("Please enter title"),
  check("description").not().isEmpty().withMessage("Please enter description")
];

const handleValidationResult = (
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

// @route POST /api/todo
// @desc Create a todo
// @access Private

todoRouter.post(
  "/",
  [...validateTodoFields, handleValidationResult, middleware],
  async (req: IAuthMiddlewareRequest, res: Response) => {
    try {
      const todo: ITodo = req.body;
      todo.user_id = req.user ;
      const newTodo = await TodoService.createTodo(todo);
      res.status(201).json(newTodo);
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

// @route GET /api/todo/:id
// @desc Get a todo
// @access Private

todoRouter.get(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const todo: ITodo | null = await TodoService.find(id);
      if (!todo) {
        handleNotFoundError(res);
      }
      return res.status(200).json(todo);
    } catch (error: any) {
      handleServerError(res, error);
    }
  }
);

// @route GET /api/todo
// @desc Get all todos
// @access Private

todoRouter.get("/", middleware, async (req: Request, res: Response) => {
  try {
    const allTodos: ITodo[] | null = await TodoService.findAll();
    if (!allTodos) {
      handleNotFoundError(res);
    }
    return res.status(200).json(allTodos);
  } catch (error: any) {
    handleServerError(res, error);
  }
});

// @route PUT /api/todo/:id
// @desc Update a todo
// @access Private

todoRouter.put(
  "/:id",
  [
    validateMongoIdParam,
    ...validateTodoFields,
    handleValidationResult,
    middleware,
  ],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const updatedItem = await TodoService.update(id, updatedTodo);
      if (!updatedItem) {
        handleNotFoundError(res);
      }
      res.status(200).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }
);

// @route PATCH /api/todo/:id
// @desc Update a todo
// @access Private
todoRouter.patch(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const updatedItem = await TodoService.patch(id, updatedTodo);
      if (!updatedItem) {
        handleNotFoundError(res);
      }
      res.status(204).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }
);

// @route DELETE /api/todo/:id
// @desc Delete a todo
// @access Private

todoRouter.delete(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const deleteItem = await TodoService.remove(id);
      if (deleteItem === null) {
        handleNotFoundError(res);
      }
      res.status(204);
    } catch (error) {
      handleServerError(res, error);
    }
  }
);
