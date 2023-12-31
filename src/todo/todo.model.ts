import mongoose from "mongoose";
import { ITodo } from "./todo.interface";

const todoSchema: mongoose.Schema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
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
    default: Date.now,
  },
});

export default mongoose.model<ITodo>("todo", todoSchema);
