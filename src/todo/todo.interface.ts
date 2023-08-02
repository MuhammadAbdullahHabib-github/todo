import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  timestamps: Date;
}
