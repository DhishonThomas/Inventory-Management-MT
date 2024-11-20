import { Request,Response,NextFunction } from "express";

import { verifyToken } from "../utils/jwtManager";
import User from '../models/userModel'
interface AuthUserRequest extends Request{
    user?:any
}


export const authMiddleware=async(req:AuthUserRequest,res:Response,next:NextFunction)=>{
const token=req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({ message: "Authorization token required"});
}

try {
    const decoded=verifyToken(token)

    req.user=decoded
const {userId}=req.user.payload

const user=User.findById({_id:userId})

if(!user){
    return res.status(401).json({ message: "No user"});

}

next()

} catch (error) {
    
}

}