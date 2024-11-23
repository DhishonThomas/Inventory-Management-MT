import { Request, Response } from "express";
import Sales from "../models/salesModel";

export class salesController {
  constructor() {}

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
    res
      .status(201)
      .json({ status: true, message: "Successfully created sale" });
  }

  async getAllSales(req: Request, res: Response) {
    const { userId } = req.params;

    const sales = await Sales.findById({ userId: userId });

    res
      .status(201)
      .json({ status: true, message: "Successfully get sales", sales: sales });
  }
}
