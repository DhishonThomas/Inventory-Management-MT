import mongoose, { ObjectId, Schema } from "mongoose";

interface ICustomer{
    name:string;
    address:string;
    mobile:string;
    userId:ObjectId;
}

const customerSchema:Schema=new Schema({
    name:{type:String,},
    address:{type:String,},
    mobile:{type:Number},
    userId:{type:Schema.Types.ObjectId,ref:"User"}
}, {timestamps:true})

export default mongoose.model<ICustomer>("Customer",customerSchema)
