import { Request,Response } from "express";
import Sales from '../models/salesModel'
export class reportController{
    constructor() {}

 async sales(req:Request,res:Response){
const {userId}=req.body
if(!userId){
    res.status(200).json({status:false,message:"No userIds"})
}


 }
    
async inventory(req:Request,res:Response){
const {userId}=req.body

}

async customer(req:Request,res:Response){
    const {userId,customerId}=req.body

}

}