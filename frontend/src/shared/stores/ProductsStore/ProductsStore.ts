import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

export class ProductsStore {
  public static async createProduct(
    currentUser: User,
  ): Promise<{ product: Product | null } & StateMachine> {
    try {
      const response = await Fetcher.post<Product>(Config.Endpoints.getProducts(), {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      })

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { product: response.data, state: 'success', error: null }
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

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { wasProductDeleted: response.data, state: 'success', error: null }
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

      if (!response) {
        throw new Error('Null response received.')
      }

      if (response.status >= 400) {
        throw new Error(response.message ?? 'empty error message received.')
      }

      return { product: response.data, state: 'success', error: null }
    } catch (error) {
      console.error(`An error occurred while updating product:`, error)
      return { product: null, state: 'error', error: error.message }
    }
  }
}
