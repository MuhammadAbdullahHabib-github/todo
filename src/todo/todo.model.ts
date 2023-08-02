import mongoose from "mongoose";
import { IbaseTodo, Itodo } from "./todo.interface";

const todoSchema: mongoose.Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IbaseTodo>("todo", todoSchema);
