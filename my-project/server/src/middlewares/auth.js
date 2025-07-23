import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const auth = async (request, response, next)=>{
    try {
        const token = request.cookies.accessToken || request?.headers?.authorization?.split("")
        [1]["Bearer", "sefhdvdgfgdfvgd"]
        
        if(!token){
            return response.status(401).json({
                message: "Provide token"
            })
        }

        const decode = await jwt.verify(token, config.secret_key_access_token)

        if(!decode){
            return response.status(401).json({
                message: "unauthorized access",
                error : true,
                success : false
            })
        }

        request.userId = decode.id;

        next();
    } catch (error) {
        return response.status(500).json({
            message: "You have not login",
            error : true,
            success : false
        })
        
    }
}

export default auth;