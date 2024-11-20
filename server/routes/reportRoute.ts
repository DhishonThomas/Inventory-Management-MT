import express from 'express'
import { authMiddleware } from '../middlewares/userAuthMiddleware'
import { reportController } from '../controllers/reportController'

const report_controller=new reportController()
const router = express.Router()

router.get("/sales/:userId",authMiddleware,(req,res)=>report_controller.sales(req,res))
router.get("/inventory/:userId",authMiddleware,(req,res)=>report_controller.inventory(req,res))
router.get("/customer/:userId/:customerId",authMiddleware,(req,res)=>report_controller.customer(req,res))

export default router