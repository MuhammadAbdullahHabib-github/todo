import express, { NextFunction, Request, Response } from "express";
import * as TodoService from "./todo.service";
import { param, check, validationResult } from "express-validator";
import { ITodo } from "./todo.interface";


export const todoRouter = express.Router();

const validateMongoIdParam = param("id")
  .isMongoId()
  .withMessage("ID should be a valid mongoID");

const validateTodoFields = [
  check("title").not().isEmpty().withMessage("Please enter title"),
  check("description").not().isEmpty().withMessage("Please enter description"),
  check("timestamps").not().isEmpty().withMessage("Please enter timestamps"),
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

todoRouter.post(
  "/",
  [...validateTodoFields, handleValidationResult],
  async (req: Request, res: Response) => {
    try {
      const todo: ITodo = req.body;
      await TodoService.create(todo);
      res.status(201).json(todo);
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

todoRouter.get(
  "/:id",
  [validateMongoIdParam, handleValidationResult],
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

todoRouter.get("/", async (req: Request, res: Response) => {
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

todoRouter.put(
  "/:id",
  [validateMongoIdParam, ...validateTodoFields, handleValidationResult],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const updatedItem = await TodoService.update(id, updatedTodo);
      if(!updatedItem){
        handleNotFoundError(res)
      }
      res.status(200).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }
);

todoRouter.patch(
  "/:id",
  [validateMongoIdParam, handleValidationResult],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const updatedTodo: ITodo = req.body;
      const updatedItem = await TodoService.patch(id, updatedTodo);
      if(!updatedItem){
        handleNotFoundError(res);
      }
      res.status(204).json(updatedItem);
    } catch (error: unknown) {
      handleServerError(res, error);
    }
  }
);

todoRouter.delete(
  "/:id",
  [validateMongoIdParam, handleValidationResult],
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const deleteItem = await TodoService.remove(id);
      if(deleteItem === null){
        handleNotFoundError(res);
      }
      res.status(204);
    } catch (error) {
      handleServerError(res,error);
    }
  }
);
