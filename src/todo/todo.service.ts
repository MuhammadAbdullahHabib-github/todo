import { ITodo } from "./todo.interface";
import todo from "./todo.model";

export const create = async (newItem: ITodo): Promise<ITodo> => {
  try {
    const createdItem = await todo.create(newItem);
    if (createdItem) {
      return createdItem.toObject();
    }
    throw new Error("Todo could not be created");
  } catch (error: any) {
    throw error;
  }
};

export const find = async (id: string): Promise<ITodo | null> => {
  try {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem) {
      return todoItem.toObject();
    }
    throw new Error(`Todo with id:${id} is not found`);
  } catch (error) {
    throw error;
  }
};

export const findAll = async (): Promise<ITodo[] | null> => {
  try {
    const todos: ITodo[] = await todo.find();
    const result = todos.map((todo: ITodo) => {
      return todo.toObject();
    });
    if (result) {
      return result;
    }
    throw new Error("No Todos found");
  } catch (error) {
    throw error;
  }
};

export const update = async (
  id: string,
  updatedObj: ITodo
): Promise<ITodo | null> => {
  try {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem == null) {
      return null;
    }
    const updatedObject = await todoItem.updateOne(updatedObj);
    if (updatedObject) {
      return updatedObject;
    }
    throw new Error("Todo not updated");
  } catch (error: any) {
    throw error;
  }
};

export const patch = async (
  id: string,
  updatedObj: ITodo
): Promise<Partial<ITodo> | null> => {
  try {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem == null) {
      return null;
    }
    const patchedItem = await todoItem.updateOne(updatedObj);
    if (patchedItem) {
      return patchedItem;
    }
    throw new Error("Todo not patched");
  } catch (error: any) {
    throw error;
  }
};

export const remove = async (id: string): Promise<ITodo | null> => {
  try {
    const todoItem = await todo.findOne({ _id: id });
    if (todoItem == null) {
      return null;
    }
    const deletedItem = await todoItem.deleteOne();
    if (deletedItem) {
      return deletedItem.toObject();
    }
    throw new Error("Todo not deleted");
  } catch (error) {
    throw error;
  }
};
