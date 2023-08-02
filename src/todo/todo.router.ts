import express, { Request, Response } from "express";
import * as TodoService from "./todo.service";
import { param, check, validationResult } from "express-validator";
import { IbaseTodo, Itodo } from "./todo.interface";
import { Itodos } from "./todos.interface";

export const todoRouter = express.Router();

todoRouter.post("/", [
  check('title'),
  check('description'),
  check('timestamps')
], async (req: Request, res: Response) => {
  try {
    const todo: IbaseTodo = req.body;
    await TodoService.create(todo);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

todoRouter.get(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be a valid mongoID")],
  async (req: Request, res: Response) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(422).json({ error: error.array() });
      }
      const id: string = req.params.id;
      const todo: Itodo | null = await TodoService.find(id);
      res.status(200).json(todo);
    } catch (error: any) {
      res.status(404).send(error.message);
    }
  }
);

todoRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allTodos: Itodos | null = await TodoService.findAll();
    res.status(200).json(allTodos);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});

todoRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const updatedTodo: IbaseTodo = req.body;
    const updatedItem = await TodoService.update(id, updatedTodo);
    res.status(200).json(updatedItem);
  } catch (error: unknown) {
    console.log(error);
    res.status(500).send(error);
  }
});

todoRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const updatedTodo: IbaseTodo = req.body;
    const updatedItem = await TodoService.patch(id, updatedTodo);
    res.status(200).json(updatedItem);
  } catch (error: unknown) {
    res.status(500).send(error);
  }
});

todoRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await TodoService.remove(id);
    res.status(200).send(`Delete Api is working`);
  } catch (error) {
    res.status(500).send(error);
  }
});
