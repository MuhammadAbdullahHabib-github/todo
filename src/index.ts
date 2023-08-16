import express, { Request, Response } from "express";
import { authRouter } from "./auth/auth.router";
import { userRouter } from "./user/user.router";
import { todoRouter } from "./todo/todo.router";
import dotenv from "dotenv";
import connectDB from "./database/mongo";
import cors from "cors";

dotenv.config();
connectDB();

const port: number = parseInt(process.env.PORT as string);
const app: express.Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`Get Api is working`);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
