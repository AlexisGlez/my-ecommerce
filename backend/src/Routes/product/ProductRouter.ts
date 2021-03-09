import express from 'express'

import { ProductController } from '@app-controllers/Product'
import { authMiddleware } from '@app-middlewares/auth'
import { adminMiddleware } from '@app-middlewares/admin'

const ProductRouter = express.Router()

ProductRouter.route('/').get(ProductController.getProducts)
ProductRouter.route('/').post(authMiddleware, adminMiddleware, ProductController.createProduct)
ProductRouter.route('/:id').get(ProductController.getProductById)
ProductRouter.route('/:id').patch(
  authMiddleware,
  adminMiddleware,
  ProductController.updateProductById,
)
ProductRouter.route('/:id').delete(authMiddleware, adminMiddleware, ProductController.deleteProduct)

export { ProductRouter }
