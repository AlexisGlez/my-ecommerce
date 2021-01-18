import express from 'express'

import { Product } from '@app-models/Product'

const productRouter = express.Router()

productRouter.get('/', async (_, res) => {
  try {
    const products = await Product.find({})
    res.json({ data: products })
  } catch (error) {
    console.error('An error happened while retrieving all products:', error)
    res.status(500).json({ data: [], message: 'Unable to retrieve products.' })
  }
})

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json({ data: product })
    } else {
      res.status(404).json({ data: null, message: 'Product not found.' })
    }
  } catch (error) {
    console.error('An error happened while retrieving a product by id:', error)
    res.status(500).json({ data: null, message: 'Unable to find product.' })
  }
})

export { productRouter }
