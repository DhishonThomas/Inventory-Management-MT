import mongoose, { Schema } from "mongoose";

interface ICustomer{
    name:string;
    address:string;
    mobile:string;
}

const customerSchema:Schema=new Schema({
    name:{type:String,},
    address:{type:String,},
    mobile:{type:Number}
}, {timestamps:true})

export default mongoose.model<ICustomer>("Customer",customerSchema)
