import { IbaseTodo, Itodo } from "./todo.interface";
import { Itodos } from "./todos.interface";
import todo from './todo.model'

// connectivity
// Add new Item

export const create = async(newItem: IbaseTodo):Promise<Itodo> => {
    const createdItem = await todo.create(newItem);
    return createdItem.toObject()
}

// find One
export const find = async (id:string):Promise<Itodo | null> => {
    const findItem = await todo.findOne({'_id':id});
    if(findItem === null){
        return null;
    }
    return findItem.toObject();

}

// find all
export const findAll = async():Promise<Itodos | null> => {
    const findAll = await todo.find();
    if(findAll == null || findAll.length === 0){
        return null
    }
    
    const allTodos:Itodos = {};
    findAll.forEach((todo)=>{
        allTodos[todo._id] = todo.toObject();
    })
    return allTodos;
}

// update

export const update = async (id:string, updatedObj:IbaseTodo):Promise<Itodo | null> => {
    const todoItem = await todo.findOne({'_id':id});
    if(todoItem == null ){
        return null;
    }
    const updatedObject = await todoItem.updateOne(updatedObj);
    return updatedObject;
}

//patch

export const patch = async (id:string, updatedObj:IbaseTodo):Promise<Itodo | null> => {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem == null) {
      return null;
    }
    const patchedItem = await todoItem.updateOne(updatedObj);
    return patchedItem;
}


// delete
export const remove = async (id:string):Promise<Itodo | null> => {
    const todoItem = await todo.findOne({'_id':id});
    if(todoItem == null ){
        return null;
    }
    const deletedItem = await todoItem.deleteOne();
    return deletedItem.toObject();
}


