import { Request,Response } from "express";

export class reportController{
    constructor() {}

 async sales(req:Request,res:Response){
const {userId}=req.body

 }
    
async inventory(req:Request,res:Response){
const {userId}=req.body
}

async customer(req:Request,res:Response){
 
    const {userId,customerId}=req.body

}

}