import { Request, Response } from 'express'

import { ProductModel } from '@app-models/Product'
import { RequestWithUser } from '@app-middlewares/auth'

export class ProductController {
  public static async getProducts(req: Request, res: Response) {
    try {
      const pageSize = Number(req.query.pageSize) || 100
      const pageNumber = Number(req.query.currentPage) || 1
      const query = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword as string,
              $options: 'i',
            },
          }
        : {}
      const productsCount = await ProductModel.countDocuments(query)
      const products = await ProductModel.find(query)
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))
      res.json({ data: { products, page: pageNumber, pages: Math.ceil(productsCount / pageSize) } })
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

  public static async createProduct(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    try {
      const product = new ProductModel({
        user: req.user.id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        rating: 0,
        numReviews: 0,
        price: 0.0,
        countInStock: 0,
      })

      const createdProduct = await product.save()

      res.status(201).json({ data: createdProduct, message: 'Product created.' })
    } catch (error) {
      console.error('An error happened while creating product:', error)
      res.status(500).json({ data: [], message: 'Unable to create product.' })
    }
  }

  public static async updateProductById(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    try {
      const product = await ProductModel.findById(req.params.id)

      if (!product) {
        res.status(404).json({ data: null, message: 'Not product found.' })
        return
      }

      product.name = req.body.name || product.name
      product.image = req.body.image || product.image
      product.brand = req.body.brand || product.brand
      product.category = req.body.category || product.category
      product.description = req.body.description || product.description
      product.price = req.body.price != null ? req.body.price : product.price
      product.countInStock =
        req.body.countInStock != null ? req.body.countInStock : product.countInStock

      const updatedProduct = await product.save()

      res.status(200).json({ data: updatedProduct, message: 'Product updated.' })
    } catch (error) {
      console.error('An error happened while updating product:', error)
      res.status(500).json({ data: [], message: 'Unable to update product.' })
    }
  }

  public static async createProductReview(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    try {
      const product = await ProductModel.findById(req.params.id)

      if (!product) {
        res.status(404).json({ data: null, message: 'Not product found.' })
        return
      }

      const alreadyReviewed = product.reviews?.find(
        (review) => review.user.toString() === req.user!._id.toString(),
      )

      if (alreadyReviewed) {
        res.status(400).json({ data: null, message: 'Product already reviewed.' })
        return
      }

      const review = {
        name: req.user!.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user._id,
      }

      if (!product.reviews) {
        product.reviews = [review]
      } else {
        product.reviews.push(review)
      }

      product.numReviews = product.reviews.length

      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.numReviews

      const updatedProduct = await product.save()

      res.status(201).json({ data: updatedProduct, message: 'Review created.' })
    } catch (error) {
      console.error('An error happened while creating product review:', error)
      res.status(500).json({ data: [], message: 'Unable to create product review.' })
    }
  }

  public static async getTopProducts(_: Request, res: Response) {
    try {
      const products = await ProductModel.find({}).sort({ rating: -1 }).limit(3)

      if (products) {
        res.json({ data: products, message: 'Top rated products.' })
      } else {
        res.status(404).json({ data: null, message: 'Product not found.' })
      }
    } catch (error) {
      console.error('An error happened while retrieving a product by id:', error)
      res.status(500).json({ data: null, message: 'Unable to find product.' })
    }
  }
}
