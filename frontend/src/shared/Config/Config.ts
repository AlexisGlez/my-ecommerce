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

  public static register() {
    return '/register'
  }

  public static profile() {
    return '/profile'
  }

  public static product(productId: string) {
    return `/product/${productId}`
  }

  public static shipping() {
    return '/shipping'
  }

  public static payment() {
    return '/payment'
  }

  public static checkout() {
    return '/checkout'
  }

  public static order(orderId: string) {
    return `/order/${orderId}`
  }

  public static checkoutProcess() {
    return `${Routes.login()}?${Routes.addRedirectTo(Routes.shipping())}`
  }

  public static formatPossibleRedirect(route: string, redirect: string | undefined) {
    if (!redirect) {
      return route
    }

    return `${route}?${Routes.addRedirectTo(redirect)}`
  }

  private static addRedirectTo(route: string) {
    return `redirect=${route.replace('/', '')}`
  }
}

class Endpoints {
  public static getProducts() {
    return `${process.env.BACKEND_ENDPOINT}/products`
  }

  public static getProductById(productId: string) {
    return `${Endpoints.getProducts()}/${productId}`
  }

  public static users() {
    return `${process.env.BACKEND_ENDPOINT}/users`
  }

  public static userProfile() {
    return `${Endpoints.users()}/profile`
  }

  public static login() {
    return `${Endpoints.users()}/login`
  }

  public static orders() {
    return `${process.env.BACKEND_ENDPOINT}/orders`
  }
}

export const Config = {
  Routes,
  Endpoints,
}
