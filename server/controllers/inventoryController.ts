import { Request, Response } from "express";
import Inventory from "../models/inventoryModel";
import { InventoryValidator } from "../utils/validatorManager";


export class InventoryController {
  constructor() {}



async getSingleProduct(req:Request,res:Response){
  const {userId,productId}=req.params

if(!userId||!productId){
  res.status(404).json({ status: false, message: "No userIds" });
  return;
}
const inventors = await Inventory.findOne({ userId: userId,_id:productId });
console.log("inventors",inventors);

res
  .status(201)
  .json({
    status: true,
    message: "Successfully get inventors",
    inventors: inventors,
  });


}

  async getInventors(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(404).json({ status: false, message: "No userIds" });
      return;
    }

    const inventors = await Inventory.find({ userId: userId });

    res
      .status(201)
      .json({
        status: true,
        message: "Successfully get inventors",
        inventors: inventors,
      });
  }

  async createInventory(req: Request, res: Response) {
    const { name, description, quantity, price, userId } = req.body;
console.log("server reached",req.body)
    if (!userId) {
      res.status(404).json({ status: false, message: "NO userIds" });
    }

    const result = InventoryValidator(name, description, quantity, price);

    if (!result.status) {
      res.status(404).json({ status: result.status, message: result.message });
      return;
    }
    
    const createInventory = await Inventory.create({
      name: name,
      userId: userId,
      description: description,
      quantity: quantity,
      price: price,
    });

    if (!createInventory) {
      res
        .status(404)
        .json({ status: false, message: "Server not created Inventory" });
    }

    res
      .status(201)
      .json({ status: true, message: "Successfully created Inventory " });
  }

  async updateInventory(req: Request, res: Response) {
    const { name, description, quantity, price, inventoryId, userId } =
      req.body;

    if (!userId || !inventoryId) {
      res.status(404).json({ status: false, message: "NO userIds" });
   return
    }

    const result = InventoryValidator(name, description, quantity, price);

    if (!result.status) {
      res.status(404).json({ status: result.status, message: result.message });
      return;
    }

    const updateInventory = await Inventory.findByIdAndUpdate(
      { _id: inventoryId, userId: userId },
      {
        name: name,
        description: description,
        quantity: quantity,
        price,
      },
      { new: true }
    );

    if (!updateInventory) {
      res
        .status(404)
        .json({ status: false, message: "Server not update the Inventory" });
   
   return
      }

    res
      .status(201)
      .json({ status: true, message: "Successfully updated the Inventory" });
  }

  async deleteInventory(req: Request, res: Response) {
    const { userId, inventoryId } = req.params;

    if (!userId || !inventoryId) {
      res.status(404).json({ status: false, message: "No userIds" });
      return;
    }

    await Inventory.findByIdAndDelete({ _id: inventoryId, userId: userId });
    res.status(201).json({ status: true, message: "Deleted" });
  }
}
