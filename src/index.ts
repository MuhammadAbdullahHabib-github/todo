import express, {Request, Response} from 'express';
import connectDB from './database/mongo';
import cors from 'cors'
import dotenv from 'dotenv';
import { todoRouter } from './todo/todo.router';

dotenv.config();
connectDB();

const port:number = parseInt(process.env.PORT as string);
const app:express.Application = express();

app.get('/',(req:Request, res:Response)=>{
    res.status(200).send(`GEt Api is working`);
})


app.use(cors());
app.use(express.json());
app.use("/api/list/todo",todoRouter)

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
})
