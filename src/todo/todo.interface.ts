import mongoose from 'mongoose'

export interface IbaseTodo extends mongoose.Document {
    title?:string;
    description?:string;
    timestamps?:Date;
}

export interface Itodo extends IbaseTodo {
    id:number;
}