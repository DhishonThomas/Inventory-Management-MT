import { Request,Response } from "express";
import Sales from '../models/salesModel'

export class salesController{
    constructor(){}

    async createSale(req:Request,res:Response){
const {itemId,quantity,customerId,paymentType,userId}=req.body

const createSale=await Sales.create({item_id:itemId,quantity:quantity,customer_id:customerId,payment_type:paymentType,userId:userId})

if(!createSale){
    res.status(200).json({status:false,message:"Server not created Sale"})

}
res.status(201).json({status:true,message:"Successfully created sale"})
    }

    async getAllSales(req:Request,res:Response){

        const {userId}=req.params

        const sales=await Sales.findById({userId:userId})

        res.status(201).json({status:true,message:"Successfully get sales",sales:sales})
    }
}