import express from 'express'

import { ProductController } from '@app-controllers/Product'

const ProductRouter = express.Router()

ProductRouter.route('/').get(ProductController.getProducts)

ProductRouter.route('/:id').get(ProductController.getProductById)

export { ProductRouter }
