import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

import dotenv from 'dotenv';

dotenv.config();


const generateAccessToken = async(userId)=>{
    const token = jwt.sign(
    { id:userId },
    config.secret_key_access_token,
    { expiresIn : '5h'}
    )
   
    return token
}


export default generateAccessToken;