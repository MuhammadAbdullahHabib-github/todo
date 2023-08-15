import  dotenv  from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserAuth } from './auth.interface';
import user from '../user/user.model';
dotenv.config();

export const login = async (loginUser: IUserAuth ): Promise<string> => {
    try {
        const {email, password} = loginUser;
        const userDoc = await user.findOne({email:email}).select('password');
        if(!userDoc){
            throw new Error('Invalid Credentials');
        }
        const isPasswordMatch =await bcrypt.compare(password, userDoc.password);
        if(!isPasswordMatch){
            throw new Error('Invalid Credentials');
        }
        const token = jwt.sign({ user: userDoc._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
        return token;
    } catch (error:any) {
        throw new Error(`Invalid Credentials ${error.message}`);
    }
}
