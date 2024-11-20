import mongoose, { Schema } from "mongoose";

interface IInventory{
    name:string,
    description:string,
quantity:number,
price:number
}

const InventorySchema:Schema=new Schema({
name:{type:String},
description:{type:String},
quantity:{type:Number},
price:{type:Number}
},{timestamps:true})

export default mongoose.model<IInventory>("Inventory",InventorySchema)