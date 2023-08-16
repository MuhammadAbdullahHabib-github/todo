import mongoose from "mongoose";
import { IUser } from "./user.interface";

let userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
       
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
});

export default mongoose.model<IUser>("user", userSchema);