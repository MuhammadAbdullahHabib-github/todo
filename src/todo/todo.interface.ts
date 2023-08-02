// import { IbaseTodo } from './todo.interface';
import mongoose from "mongoose";

export interface IbaseTodo extends mongoose.Document {
  title: string;
  description: string;
  timestamps: Date;
}
export interface IpartialTodo extends Partial<IbaseTodo>{}

export interface Itodo extends IbaseTodo {
  id: number;
}
