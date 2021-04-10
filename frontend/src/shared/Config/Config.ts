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

  public static users() {
    return `/admin/users`
  }

  public static editUser(userId: string) {
    return `/admin/user/${userId}/edit`
  }

  public static products() {
    return `/admin/products`
  }

  public static editProduct(productId: string) {
    return `/admin/product/${productId}/edit`
  }

  public static orders() {
    return `/admin/orders`
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

  public static uploadProductImage() {
    return `${process.env.BACKEND_ENDPOINT}/upload`
  }

  public static users() {
    return `${process.env.BACKEND_ENDPOINT}/users`
  }

  public static userById(userId: string) {
    return `${Endpoints.users()}/${userId}`
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

  public static allOrders() {
    return `${Endpoints.orders()}/all`
  }

  public static orderById(orderId: string) {
    return `${Endpoints.orders()}/${orderId}`
  }

  public static payOrder(orderId: string) {
    return `${Endpoints.orderById(orderId)}/pay`
  }

  public static deliverOrder(orderId: string) {
    return `${Endpoints.orderById(orderId)}/deliver`
  }

  public static paypalId() {
    return `${process.env.BACKEND_ENDPOINT}/config/paypal`
  }
}

export const Config = {
  Routes,
  Endpoints,
}
