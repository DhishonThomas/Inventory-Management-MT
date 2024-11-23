import express from 'express'
import { authMiddleware } from '../middlewares/userAuthMiddleware'
import { salesController } from '../controllers/salesController'
const sales_controller=new salesController()
const router = express.Router()


router.post("/",authMiddleware,(req,res)=>sales_controller.createSale(req,res))
router.get("/:userId",authMiddleware,(req,res)=>sales_controller.getAllSales(req,res))

export default router