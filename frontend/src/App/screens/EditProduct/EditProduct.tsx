import Head from 'next/head'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { Heading, VStack, Button, Box, Alert, AlertIcon, Flex } from '@chakra-ui/react'

import { Config } from '@app-src/shared/Config'
import { Input } from '@app-shared/components/Input'
import { ErrorMessage } from '@app-shared/components/ErrorMessage'
import { Spinner } from '@app-shared/components/Spinner'
import { GoBack } from '@app-shared/components/Link'
import { UserStore } from '@app-stores/UserStore'
import { ProductsStore } from '@app-stores/ProductsStore'
import { useRedirect } from '@app-shared/hooks/useRedirect'
import { useGetProduct } from '@app-shared/hooks/useGetProduct'

import styles from './EditProduct.module.css'

interface EditProductProps {}

export const EditProduct: React.FC<EditProductProps> = () => {
  const [isLoading, setLoading] = useState(false)
  const [isImageUploading, setImageUploading] = useState(false)
  const [updateProductErrorMessage, setUpdateProductErrorMessage] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState('')
  const currentUser = UserStore.useCurrentUser()
  const router = useRouter()
  const redirect = useRedirect(Config.Routes.login())
  const { product, state, error } = useGetProduct(router.query.id as string)

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [price, setPrice] = useState('')
  const [priceError, setPriceError] = useState('')
  const [brand, setBrand] = useState('')
  const [brandError, setBrandError] = useState('')
  const [image, setImage] = useState('')
  const [imageError, setImageError] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [category, setCategory] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [countInStockError, setCountInStockError] = useState('')

  useEffect(() => {
    if (!product) {
      return
    }

    setName(product.name)
    setPrice(product.price.toString())
    setBrand(product.brand)
    setImage(product.image)
    setDescription(product.description)
    setCategory(product.category)
    setCountInStock(product.countInStock.toString())
  }, [product])

  if (!currentUser || !currentUser.isAdmin) {
    redirect()
    return <Spinner />
  }

  const editProduct = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (!product) {
      return
    }

    setNameError('')
    setPriceError('')
    setBrandError('')
    setImageError('')
    setDescriptionError('')
    setCategoryError('')
    setCountInStockError('')

    let isValid = true

    const trimmedName = name.trim()
    const trimmedPrice = price.trim()
    const trimmedBrand = brand.trim()
    const trimmedImage = image.trim()
    const trimmedDescription = description.trim()
    const trimmedCategory = category.trim()
    const trimmedCountInStock = countInStock.trim()

    if (!trimmedName) {
      setNameError('Name is required.')
      isValid = false
    }

    if (!trimmedPrice) {
      setPriceError('Price is required.')
      isValid = false
    }

    if (!trimmedBrand) {
      setBrandError('Brand is required.')
      isValid = false
    }

    if (!trimmedImage) {
      setImageError('Image is required.')
      isValid = false
    }

    if (!trimmedDescription) {
      setDescriptionError('Description is required.')
      isValid = false
    }

    if (!trimmedCategory) {
      setCategoryError('Category is required.')
      isValid = false
    }

    if (!trimmedCountInStock) {
      setCountInStockError('CountInStock is required.')
      isValid = false
    }

    if (!isValid) {
      return
    }

    setLoading(true)

    const response = await ProductsStore.updateProductById(
      currentUser,
      product._id,
      trimmedName,
      trimmedPrice,
      trimmedBrand,
      trimmedImage,
      trimmedDescription,
      trimmedCategory,
      trimmedCountInStock,
    )

    if (!response || response.error || response.state === 'error' || !response.product) {
      setUpdateProductErrorMessage(
        response.error ?? 'An error occured while updating product. Please try again later.',
      )
    } else {
      setName(response.product.name)
      setPrice(response.product.price.toString())
      setBrand(response.product.brand)
      setImage(response.product.image)
      setDescription(response.product.description)
      setCategory(response.product.category)
      setCountInStock(response.product.countInStock.toString())
      setUpdateSuccess('Product updated successfully.')
    }

    setLoading(false)
  }

  const imageFileUploadHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setImageError('')

    const formData = new FormData()
    formData.append('image', file)

    setImageUploading(true)

    const response = await ProductsStore.uploadImage(formData)

    if (!response || response.error || response.state === 'error' || !response.image) {
      setImageError(
        response.error ?? 'An error occured while updating product. Please try again later.',
      )
    } else {
      setImage(response.image)
    }

    setImageUploading(false)
  }

  const errorMessage = error || updateProductErrorMessage

  return (
    <>
      <Head>
        <title>My Ecommerce | Admin | Edit Product</title>
        <meta name="description" content="Admin edit product" />
        <meta name="keywords" content="admin,edit,product" />
      </Head>
      {(errorMessage || updateSuccess) && (
        <Box mb="1rem">
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {updateSuccess && (
            <Alert status="success">
              <AlertIcon />
              {updateSuccess}
            </Alert>
          )}
        </Box>
      )}
      {state === 'loading' ? (
        <Spinner />
      ) : (
        <VStack
          margin="0 auto"
          maxWidth="500px"
          alignItems="start"
          spacing="1.5rem"
          as="form"
          onSubmit={editProduct}
        >
          <GoBack />
          <Heading as="h1" textAlign="start">
            Edit Product
          </Heading>
          <Input
            id="name"
            isInvalid={Boolean(nameError)}
            label="Name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={nameError}
          />
          <Input
            id="price"
            isInvalid={Boolean(priceError)}
            label="Price"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            error={priceError}
          />
          <Input
            id="description"
            isInvalid={Boolean(descriptionError)}
            label="Description"
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={descriptionError}
          />
          <Input
            id="brand"
            isInvalid={Boolean(brandError)}
            label="Brand"
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            error={brandError}
          />
          <Input
            id="category"
            isInvalid={Boolean(categoryError)}
            label="Category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            error={categoryError}
          />
          <Input
            id="countInStock"
            isInvalid={Boolean(countInStockError)}
            label="Count In Stock"
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(event) => setCountInStock(event.target.value)}
            error={countInStockError}
          />
          <Flex className={styles.image} justifyContent="space-between" width="100%">
            <Input
              id="image"
              isInvalid={Boolean(imageError)}
              label="Paste Image URL"
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              error={imageError}
            />
            <Input
              id="image-file"
              isInvalid={Boolean(imageError)}
              label="Or Upload Image File"
              type="file"
              placeholder="Choose File"
              value=""
              onChange={imageFileUploadHandler}
            />
          </Flex>
          <Button type="submit" isLoading={isLoading || isImageUploading} disabled={isLoading}>
            Update
          </Button>
        </VStack>
      )}
    </>
  )
}
