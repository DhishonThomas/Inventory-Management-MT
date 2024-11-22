import express from 'express'
import { InventoryController } from '../controllers/inventoryController'
import { authMiddleware } from '../middlewares/userAuthMiddleware'
const inventory_controller=new InventoryController()

const router =express.Router()

router.get("/:userId",authMiddleware,(req,res)=>inventory_controller.getInventors(req,res))
router.get("/:userId/:productId",authMiddleware,(req,res)=>inventory_controller.getSingleProduct(req,res))
router.post("/",authMiddleware,(req,res)=>inventory_controller.createInventory(req,res))
router.put("/",authMiddleware,(req,res)=>inventory_controller.updateInventory(req,res))
router.delete("/",authMiddleware,(req,res)=>inventory_controller.deleteInventory(req,res))

export default router