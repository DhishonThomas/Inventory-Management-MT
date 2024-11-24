import { Request, Response } from "express";
import Sales from "../models/salesModel";
import Inventory from "../models/inventoryModel"
export class salesController {
  constructor() {}


  async getInventoryReport(req:Request,res:Response){
    const {userId,productId}=req.params
  
  if(!userId||!productId){
    res.status(200).json({ status: false, message: "No userIds" });
    return;
  }
  const sales = await Sales.find({ userId: userId,item_id:productId }).populate("userId").populate("item_id")

  console.log("sales",sales);
  
  res
    .status(201)
    .json({
      status: true,
      message: "Successfully get inventors sales",
      sales: sales,
    });
  
  
  }
  async getCustomerReport(req:Request,res:Response){
    const {userId,customerId}=req.params
  
  if(!userId||!customerId){
    res.status(200).json({ status: false, message: "No userIds" });
    return;
  }
  const sales = await Sales.find({ userId: userId,customer_id:customerId }).populate("userId").populate("customer_id")

  console.log("sales",sales);
  
  res
    .status(201)
    .json({
      status: true,
      message: "Successfully get customers sales",
      sales: sales,
    });
  
  
  }

  async createSale(req: Request, res: Response) {
    const { item_id, quantity, customer_id, payment_type, userId, totalPrice } =
      req.body;
    const createSale = await Sales.create({
      totalPrice: totalPrice,
      item_id: item_id,
      quantity: quantity,
      customer_id: customer_id,
      payment_type: payment_type,
      userId: userId,
    });

    if (!createSale) {
      res
        .status(200)
        .json({ status: false, message: "Server not created Sale" });
    }


    await Inventory.findOneAndUpdate({_id:item_id,userId:userId},{$inc:{quantity:-quantity}})
    res
      .status(201)
      .json({ status: true, message: "Successfully created sale" });
  }

  async getAllSales(req: Request, res: Response) {
    console.log("server reached");
    
    const { userId } = req.params;

    const sales = await Sales.find({ userId: userId }).populate('customer_id').populate('item_id')
console.log(sales)
    res
      .status(201)
      .json({ status: true, message: "Successfully get sales", sales: sales });
  }
}
