import { Fetcher } from '@app-shared/Fetcher'
import { Config } from '@app-shared/Config'

export class ProductsStore {
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
  ): Promise<{ product: Product | null } & StateMachine> {
    try {
      const response = await Fetcher.patch<Product>(Config.Endpoints.getProductById(productId), {
        data: { name },
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
