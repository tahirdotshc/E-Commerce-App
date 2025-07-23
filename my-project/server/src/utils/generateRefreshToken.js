import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { log } from "console";
import dotenv from 'dotenv';

dotenv.config();

const generateRefreshToken = async(userId)=>{
   
    
    const token = jwt.sign({ id : userId},
        config.secret_key_refresh_token,
        { expiresIn : '7d'}
    )
 
   await UserModel.updateOne(
      { _id: userId },
      { refresh_token: token }
    );
 

    return token

}

export default generateRefreshToken;