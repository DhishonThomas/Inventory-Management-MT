import express from 'express'
import { customerController } from '../controllers/customerController'
import { authMiddleware } from '../middlewares/userAuthMiddleware'
const customer_controller=new customerController()

const router = express.Router()

router.get("/:userId",authMiddleware,(req,res)=>customer_controller.getAllCustomers(req,res))
router.post("/",authMiddleware,(req,res)=>customer_controller.createCustomer(req,res))
router.put("/",authMiddleware,(req,res)=>customer_controller.updateCustomer(req,res))
router.delete("/",authMiddleware,(req,res)=>customer_controller.deleteCustomer(req,res))

export default router