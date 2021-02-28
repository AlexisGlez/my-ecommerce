import { Response } from 'express'

import { OrderModel } from '@app-models/Order'
import { RequestWithUser } from '@app-middlewares/auth'

export class OrderController {
  public static async postOrder(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body

    if (!orderItems || !orderItems.length) {
      res.status(400).json({ data: null, message: 'No order items found.' })
      return
    }

    try {
      const order = new OrderModel({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createdOrder = await order.save()

      res.status(201).json({ data: createdOrder, message: 'Order created.' })
    } catch (error) {
      console.error('An error happened while creating the order:', error)
      res.status(500).json({ data: [], message: 'Unable to create order.' })
    }
  }
}
