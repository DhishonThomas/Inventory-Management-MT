import express from 'express'
import userRoutes from './userRoute'
import inventoryRoutes from './inventoryRoute'
import salesRoutes from './salesRoute'
import reportRoutes from './reportRoute'
import customerRoutes from './customerRoute'

const router = express.Router()


router.use("/user",userRoutes)
router.use("/inventory",inventoryRoutes)
router.use("/sales",salesRoutes)
router.use("/report",reportRoutes)
router.use("/customer",customerRoutes)

export default router


