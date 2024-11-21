import { Request,Response } from "express";
import Inventory from "../models/inventoryModel"
export class InventoryController{
    constructor(){}

async getInventors(req:Request,res:Response){

}

async createInventory(req:Request,res:Response){

}

async updateInventory(req:Request,res:Response){

}

async deleteInventory(req:Request,res:Response){

    const {userId,inventoryId}=req.body

    if(!userId||!inventoryId){
        res.status(200).json({status:false,message:"No userIds"})
    return 
    }

    await Inventory.findByIdAndDelete({_id:inventoryId,userId:userId})

}


}