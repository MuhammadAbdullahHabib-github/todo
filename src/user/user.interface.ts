import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    todos: string[];
}