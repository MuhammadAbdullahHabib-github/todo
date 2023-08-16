import jwt from "jsonwebtoken";
import { IUser } from "./user.interface";
import user from "./user.model";

export const createUser = async (newUser: Partial<IUser>): Promise<string> => {
  try {
    const currentUser = await user.findOne({ email: newUser.email });
    if (currentUser) {
      throw new Error("User already exists");
    }
    const createdUser = await user.create(newUser);
    const token = jwt.sign(
      { user: createdUser._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );
    if (token) {
      return token;
    }
    throw new Error("Failed to create user");
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};
