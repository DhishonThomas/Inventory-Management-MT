import { Request,Response,NextFunction } from "express";

import { verifyToken } from "../utils/jwtManager";
import User from '../models/userModel'
interface AuthUserRequest extends Request{
    user?:any
}


export const authMiddleware=async(req:AuthUserRequest,res:Response,next:NextFunction):Promise<void>=>{
const token=req.headers.authorization?.split(" ")[1];
if(!token){
     res.status(401).json({ message: "Authorization token required"});
     return
}

try {


    const decoded=verifyToken(token)

    req.user=decoded
const {userId}=req.user

const user=User.findById({_id:userId})

if(!user){
     res.status(401).json({ message: "No user"});
     return

}
 
next()

} catch (error) {
     res.status(401).json({ message: "Invalid or expired token" });
     return
    }

}