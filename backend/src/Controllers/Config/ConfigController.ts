import { Request, Response } from 'express'

import { Config } from '@app-config/Config'

export class ConfigController {
  public static async getPaypalClientId(_: Request, res: Response) {
    res.status(200).json({ data: Config.Constants.paypalClientId, message: 'Paypal Client ID' })
  }
}
