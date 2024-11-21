import { Request,Response } from "express";
import Inventory from "../models/inventoryModel"
import { InventoryValidator } from "../utils/validatorManager";
export class InventoryController{
    constructor(){}

async getInventors(req:Request,res:Response){

}

async createInventory(req:Request,res:Response){

}

async updateInventory(req:Request,res:Response){

    const {name,description,quantity,price,inventoryId,userId}=req.body

    if(!userId||!inventoryId){
        res.status(200).json({status:false,message:"NO userIds"})
    }

    const result = InventoryValidator(name,description,quantity,price)

    if(!result.status){
        res.status(200).json({status:result.status,message:result.message})
        return
    }

    const updateInventory=await Inventory.findByIdAndUpdate({_id:inventoryId,userId:userId},{
        name:name,description:description,quantity:quantity,price
    },{new:true})

    if(!updateInventory){
        res.status(200).json({status:false,message:"Server not update the Inventory"})
    }

    res.status(201).json({status:true,message:"Successfully updated the Inventory"})
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