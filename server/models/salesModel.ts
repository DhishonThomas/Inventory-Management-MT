import mongoose, { ObjectId, Schema } from "mongoose";

interface ISale{
    date:Date,
    item_id?:ObjectId;
    is_cash:boolean;
    quantity:number;
    customer:{name:string,_id:ObjectId,mobile:number};
    payment_type:string;
    userId:ObjectId
}

const saleSchema:Schema=new Schema({
    date:{type:Date},
    item_id:{type:Schema.Types.ObjectId,ref:"Inventory",required:false},
    // is_cash:{type:Boolean,default:false,required:false},
    quantity:{type:Number},
    customer:{name:{type:String},_id:{type:Schema.Types.ObjectId},mobile:{type:Number}},
    payment_type:{type:String},
    totalPrice:{type:String},
    userId:{type:Schema.Types.ObjectId,ref:"User"}
},{timestamps:true})


// saleSchema.pre("save",function(next){
//     if(this.is_cash && this.item_id){
//         return next(new Error("Cannot set both item_id and is_cash"))
// }
// next()    
// })


export default mongoose.model<ISale>("Sales",saleSchema)