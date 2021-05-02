import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'
import { checkNullResponse, check4xxErrors } from '@app-stores/utils'

export class ProductsStore {
  public static async createProduct(
    currentUser: User,
  ): Promise<{ product: Product | null } & StateMachine> {
    try {
      const response = await Fetcher.post<Product>(Config.Endpoints.getProducts(), {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { product: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while creating product:`, error)
      return { product: null, state: 'error', error: error.message }
    }
  }

  public static async deleteProduct(
    currentUser: User,
    productId: string,
  ): Promise<{ wasProductDeleted: boolean | null } & StateMachine> {
    try {
      const response = await Fetcher.delete<boolean>(Config.Endpoints.getProductById(productId), {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { wasProductDeleted: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while deleting product:`, error)
      return { wasProductDeleted: null, state: 'error', error: error.message }
    }
  }

  public static async updateProductById(
    currentUser: User,
    productId: string,
    name: string,
    price: string,
    brand: string,
    image: string,
    description: string,
    category: string,
    countInStock: string,
  ): Promise<{ product: Product | null } & StateMachine> {
    try {
      const response = await Fetcher.patch<Product>(Config.Endpoints.getProductById(productId), {
        data: { name, price, brand, image, description, category, countInStock },
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { product: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while updating product:`, error)
      return { product: null, state: 'error', error: error.message }
    }
  }

  public static async uploadImage(
    formData: FormData,
  ): Promise<{ image: string | null } & StateMachine> {
    try {
      const response = await Fetcher.post<string>(Config.Endpoints.uploadProductImage(), {
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      checkNullResponse(response)
      check4xxErrors(response)

      return { image: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while uploading product image:`, error)
      return { image: null, state: 'error', error: 'File type not supported.' }
    }
  }

  public static async createProductReview(
    currentUser: User,
    productId: string,
    data: { rating: number; comment: string },
  ): Promise<{ product: Product | null } & StateMachine> {
    try {
      const response = await Fetcher.post<Product>(
        Config.Endpoints.createProductReview(productId),
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
          data,
        },
      )

      checkNullResponse(response)
      check4xxErrors(response)

      return { product: response!.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while creating product review:`, error)
      return { product: null, state: 'error', error: error.message }
    }
  }
}
