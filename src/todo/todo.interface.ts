import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  user_id?: string;
  title: string;
  description: string;
  timestamps: Date;
}
