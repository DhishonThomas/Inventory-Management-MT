import mongoose, { ObjectId, Schema } from "mongoose";

interface IInventory{
    name:string,
    description:string,
quantity:number,
price:number,
userId:ObjectId
}

const InventorySchema:Schema=new Schema({
name:{type:String},
description:{type:String},
quantity:{type:Number},
price:{type:Number},
userId:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})

export default mongoose.model<IInventory>("Inventory",InventorySchema)