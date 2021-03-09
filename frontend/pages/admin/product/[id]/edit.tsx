import dynamic from 'next/dynamic'
import * as EditProductPage from '@app-edit-product/EditProduct'

export default dynamic(() => Promise.resolve(EditProductPage.EditProduct), {
  ssr: false,
})
