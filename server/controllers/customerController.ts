import { Request, Response } from "express";
import Customer from "../models/customerModel";
import { customerValidator } from "../utils/validatorManager";

export class customerController {
  constructor() {}

  async getAllCustomers(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      res.status(401).json({ status: false, message: "No userId find" });
    }

    const customers = await Customer.find({ userId: userId });


    if (!customers) {
      res
        .status(404)
        .json({ status: false, message: "No customers with this user" });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Successfully get customers",
      customers: customers,
    });
  }

  async createCustomer(req: Request, res: Response) {
    const { name, address, mobile, userId } = req.body;

    const result = customerValidator(name, address, mobile);

    if (!result.status) {
      res.status(400).json({ status: result.status, message: result.message });
      return;
    }

const alreadyCustomer=await Customer.findOne({mobile:mobile,userId:userId})

if(alreadyCustomer){
  res.status(409).json({ status: false, message: "Already a customer" });

  return
}
    const newCustomer = await Customer.create({
      name: name,
      userId: userId,
      address: address,
      mobile: mobile,
    });

    if (!newCustomer) {
      res
        .status(400)
        .json({ status: false, message: "Customer is not saved by server" });
      return;
    }

    res
      .status(201)
      .json({ status: true, message: "Successfully customer is created." });
  }

  async updateCustomer(req: Request, res: Response) {
    const {name, address, customerId, userId, mobile } = req.body;

    if (!userId || !customerId) {
      res.status(404).json({ status: false, message: "No userId" });
    }

    const result = customerValidator(name, address, mobile);

    if (!result.status) {
      res.status(400).json({ status: result.status, message: result.message });
      return;
    }

    const updateCustomer = await Customer.findByIdAndUpdate(
      { _id: customerId, userId: userId },
      { name: name, address: address, mobile: mobile },
      { new: true }
    );

    if (!updateCustomer) {
      res
        .status(404)
        .json({ status: false, message: "Server did not update customer" });
      return;
    }

    res
      .status(201)
      .json({ status: true, message: "Successfully updated customer" });
  }

  async deleteCustomer(req: Request, res: Response) {
    const { userId, customerId } = req.params;

    if (!userId || !customerId) {
      res.status(400).json({ status: false, message: "No user with this id." });
    }

    await Customer.findByIdAndDelete({ _id: customerId, userId: userId });

    res.status(201).json({ status: true, message: "Deleted" })
  }
}
