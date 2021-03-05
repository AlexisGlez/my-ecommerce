import express from 'express'

import { OrderController } from '@app-controllers/Order'
import { authMiddleware } from '@app-middlewares/auth'

const OrderRouter = express.Router()

OrderRouter.route('/').post(authMiddleware, OrderController.postOrder)
OrderRouter.route('/all').get(authMiddleware, OrderController.getAllUserOrders)
OrderRouter.route('/:id').get(authMiddleware, OrderController.getOrderById)
OrderRouter.route('/:id/pay').patch(authMiddleware, OrderController.payOrder)

export { OrderRouter }
