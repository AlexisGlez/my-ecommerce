class Endpoints {
  public static getProducts() {
    return `${process.env.BACKEND_ENDPOINT}/products`
  }

  public static getProductById(productId: string) {
    return `${Endpoints.getProducts()}/${productId}`
  }
}

export const Config = {
  Endpoints,
}