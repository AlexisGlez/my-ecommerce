import jsHttpCookie from 'cookie'
import JSCookies from 'js-cookie'

export class Cookies {
  public static readonly Cart = 'cart'
  public static readonly User = 'user'

  public static set(name: string, value: any) {
    if (value != null) {
      JSCookies.set(name, value, { expires: Infinity })
    }
  }

  public static getString(name: string) {
    return JSCookies.get(name)
  }

  public static getNumber(name: string) {
    const value = JSCookies.get(name)
    if (value && typeof value === 'string') {
      return Number(value)
    }
    return undefined
  }

  public static getObject(name: string) {
    return JSCookies.getJSON(name)
  }

  public static getAll() {
    return JSCookies.getJSON()
  }

  public static remove(name: string) {
    JSCookies.remove(name)
  }

  public static parseHttpCookies(cookies: string) {
    if (cookies && typeof cookies === 'string') {
      return jsHttpCookie.parse(cookies)
    }

    return null
  }
}
