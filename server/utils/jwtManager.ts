import jwt from "jsonwebtoken";

const SECRET_KEY=process.env.JWT_SECRET || "inventory_jwt_secret_key"

export const generateToken=(payload:object):string=>{
    return jwt.sign(payload,SECRET_KEY,{expiresIn:'2h'})
}


export const verifyToken=(token:string):any=>{
    try{
        return jwt.verify(token,SECRET_KEY)
    }catch(error){
        throw new Error("Bad token")
    }
}