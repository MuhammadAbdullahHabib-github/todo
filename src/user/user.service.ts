import {IUser} from "./user.interface";
import user from "./user.model";

export const createUser = async (newUser: Partial<IUser>): Promise<IUser> => {
    try{
        const createdUser = await user.create(newUser);
        if(createdUser){
            return createdUser;
        }
        throw new Error("Failed to create user");
    }catch(error:any){
        throw new Error(`Failed to create user: ${error.message}`);
    }
}