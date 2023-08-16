import express, { Response } from "express";
import { middleware } from "./../auth/auth.middleware";

import {
  validateMongoIdParam,
  validateTodoFields,
  handleValidationResult,
} from "./todo.controller";

import {
  createController,
  findController,
  findAllController,
  updateController,
  patchController,
  deleteController,
} from "./todo.controller";

export const todoRouter = express.Router();

// @route POST /api/todo
// @desc Create a todo
// @access Private

todoRouter.post(
  "/",
  [...validateTodoFields, handleValidationResult, middleware],
  createController
);

// @route GET /api/todo/:id
// @desc Get a todo
// @access Private

todoRouter.get(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  findController
);

// @route GET /api/todo
// @desc Get all todos
// @access Private

todoRouter.get("/", middleware, findAllController);

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
  updateController
);

// @route PATCH /api/todo/:id
// @desc Update a todo
// @access Private
todoRouter.patch(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  patchController
);

// @route DELETE /api/todo/:id
// @desc Delete a todo
// @access Private

todoRouter.delete(
  "/:id",
  [validateMongoIdParam, handleValidationResult, middleware],
  deleteController
);
