import express from 'express'

import { OrderController } from '@app-controllers/Order'
import { authMiddleware } from '@app-middlewares/auth'

const OrderRouter = express.Router()

OrderRouter.route('/').post(authMiddleware, OrderController.postOrder)
OrderRouter.route('/:id').get(authMiddleware, OrderController.getOrderById)

export { OrderRouter }
