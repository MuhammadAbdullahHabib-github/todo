import { IbaseTodo, Itodo } from "./todo.interface";
import { Itodos } from "./todos.interface";
import todo from "./todo.model";

// connectivity
// Add new Item

export const create = async (newItem: IbaseTodo): Promise<Itodo> => {
  const createdItem = await todo.create(newItem);
  return createdItem.toObject();
};

// find One
export const find = async (id: string): Promise<Itodo | null> => {
  try {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem) {
      return todoItem.toObject();
    }
    throw new Error("Todo not found");
  } catch (error) {
    throw error;
  }
};

export const findAll = async (): Promise<Itodos | null> => {
  try {
    const todos = await todo.find();

    const result = todos.map((todo: IbaseTodo) => {
      return todo.toObject();
    });

    return result;
  } catch (error) {
    throw error;
  }
};

// update

export const update = async (
  id: string,
  updatedObj: IbaseTodo
): Promise<Itodo | null> => {
  const todoItem = await todo.findOne({ _id: id });
  if (todoItem == null) {
    return null;
  }
  const updatedObject = await todoItem.updateOne(updatedObj);
  return updatedObject;
};

//patch

export const patch = async (
  id: string,
  updatedObj: IbaseTodo
): Promise<Itodo | null> => {
  const todoItem = await todo.findOne({ _id: id });
  if (todoItem == null) {
    return null;
  }
  const patchedItem = await todoItem.updateOne(updatedObj);
  return patchedItem;
};

// delete
export const remove = async (id: string): Promise<Itodo | null> => {
  const todoItem = await todo.findOne({ _id: id });
  if (todoItem == null) {
    return null;
  }
  const deletedItem = await todoItem.deleteOne();
  return deletedItem.toObject();
};
