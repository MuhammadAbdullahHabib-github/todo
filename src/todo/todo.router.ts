import express, {Request,Response} from 'express';
import * as TodoService from './todo.service';
import { IbaseTodo, Itodo } from './todo.interface';


export const todoRouter = express.Router();

todoRouter.post("/",async (req:Request, res:Response)=>{
    try {
        const todo:IbaseTodo = req.body;
        await TodoService.create(todo);
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).send(error)
    }
});


todoRouter.get('/:id', async (req:Request, res:Response) => {
    const id:string= req.params.id;
    try {
        const todo:Itodo | null= await TodoService.find(id);
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).send(error)
    }
})

todoRouter.get('/', async (req:Request, res:Response) => {
    try {
        const allTodos = await TodoService.findAll();
        res.status(200).json(allTodos)
    } catch (error) {
        res.status(500).send(error);
    }
})

todoRouter.put('/:id', async (req:Request, res:Response) => {
    try {
        const id:string = req.params.id;
        const updatedTodo:IbaseTodo = req.body;
        const updatedItem = await TodoService.update(id, updatedTodo);
        res.status(200).json(updatedItem)
    } catch (error: unknown) {
        console.log(error);
        res.status(500).send(error);
    }
})

todoRouter.patch('/:id', async (req:Request, res:Response) => {
    try {
        const id:string = req.params.id;
        const updatedTodo:IbaseTodo = req.body;
        const updatedItem = await TodoService.patch(id, updatedTodo);
        res.status(200).json(updatedItem)
    } catch (error: unknown) {  
        res.status(500).send(error);
    }
})

todoRouter.delete('/:id', async (req:Request, res:Response) => {
    try {
        const id:string = req.params.id;
        await TodoService.remove(id);
        res.status(200).send(`Delete Api is working`);
    } catch (error) {
        res.status(500).send(error)      
    }
})
