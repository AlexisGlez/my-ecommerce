import express from 'express'

import { OrderController } from '@app-controllers/Order'
import { authMiddleware } from '@app-middlewares/auth'
import { adminMiddleware } from '@app-middlewares/admin'

const OrderRouter = express.Router()

OrderRouter.route('/').post(authMiddleware, OrderController.postOrder)
OrderRouter.route('/').get(authMiddleware, adminMiddleware, OrderController.getAllOrders)
OrderRouter.route('/all').get(authMiddleware, OrderController.getAllUserOrders)
OrderRouter.route('/:id').get(authMiddleware, OrderController.getOrderById)
OrderRouter.route('/:id/pay').patch(authMiddleware, OrderController.payOrder)
OrderRouter.route('/:id/deliver').patch(
  authMiddleware,
  adminMiddleware,
  OrderController.deliverOrder,
)

export { OrderRouter }
