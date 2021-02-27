import express from 'express'

import { OrderController } from '@app-controllers/Order'
import { authMiddleware } from '@app-middlewares/auth'

const OrderRouter = express.Router()

OrderRouter.route('/').post(authMiddleware, OrderController.postOrder)

export { OrderRouter }
