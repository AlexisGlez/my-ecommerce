import dynamic from 'next/dynamic'
import * as ProductsPage from '@app-products/Products'

export default dynamic(() => Promise.resolve(ProductsPage.Products), {
  ssr: false,
})
