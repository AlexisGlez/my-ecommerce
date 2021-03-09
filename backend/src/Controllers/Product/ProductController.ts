import { Request, Response } from 'express'

import { ProductModel } from '@app-models/Product'

export class ProductController {
  public static async getProducts(_: Request, res: Response) {
    try {
      const products = await ProductModel.find({})
      res.json({ data: products })
    } catch (error) {
      console.error('An error happened while retrieving all products:', error)
      res.status(500).json({ data: [], message: 'Unable to retrieve products.' })
    }
  }

  public static async getProductById(req: Request, res: Response) {
    try {
      const product = await ProductModel.findById(req.params.id)

      if (product) {
        res.json({ data: product })
      } else {
        res.status(404).json({ data: null, message: 'Product not found.' })
      }
    } catch (error) {
      console.error('An error happened while retrieving a product by id:', error)
      res.status(500).json({ data: null, message: 'Unable to find product.' })
    }
  }

  public static async deleteProduct(req: Request, res: Response) {
    try {
      const product = await ProductModel.findById(req.params.id)

      if (!product) {
        res.status(404).json({ data: null, message: 'Not product found.' })
        return
      }

      await product.remove()
      res.status(200).json({ data: true, message: 'Product deleted.' })
    } catch (error) {
      console.error('An error happened while deleting product:', error)
      res.status(500).json({ data: null, message: 'Unable to delete product.' })
    }
  }

  public static async updateProductById(req: Request, res: Response) {
    try {
      const product = await ProductModel.findById(req.params.id)

      if (!product) {
        res.status(404).json({ data: null, message: 'Not product found.' })
        return
      }

      product.name = req.body.name || product.name

      const updatedProduct = await product.save()

      res.status(200).json({ data: updatedProduct, message: 'Product updated.' })
    } catch (error) {
      console.error("An error happened while updating the product's data:", error)
      res.status(500).json({ data: null, message: "Unable to update product's data." })
    }
  }
}
