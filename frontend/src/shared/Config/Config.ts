class Routes {
  public static home() {
    return '/'
  }

  public static cart() {
    return '/cart'
  }

  public static login() {
    return '/login'
  }

  public static shipping() {
    return '/shipping'
  }

  public static checkoutProcess() {
    return `${Routes.login()}?redirect=${Routes.shipping().replace('/', '')}`
  }
}

class Endpoints {
  public static getProducts() {
    return `${process.env.BACKEND_ENDPOINT}/products`
  }

  public static getProductById(productId: string) {
    return `${Endpoints.getProducts()}/${productId}`
  }
}

export const Config = {
  Routes,
  Endpoints,
}
