import express from 'express'
import { authMiddleware } from '../middlewares/userAuthMiddleware'
import { salesController } from '../controllers/salesController'
const sales_controller=new salesController()
const router = express.Router()


router.post("/",authMiddleware,(req,res)=>sales_controller.createSale(req,res))
router.get("/:userId",authMiddleware,(req,res)=>sales_controller.getAllSales(req,res))
router.get("/inventory_report/:userId/:productId",authMiddleware,(req,res)=>sales_controller.getInventoryReport(req,res))
router.get("/customer_report/:userId/:customerId",authMiddleware,(req,res)=>sales_controller.getCustomerReport(req,res))
router.get("/dashboard/:userId",authMiddleware,(req,res)=>sales_controller.getMonthlyRevenueGraph(req,res))
export default router