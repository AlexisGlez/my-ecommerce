import jwt from 'jsonwebtoken'

import { Config } from '@app-config/Config'

export function generateAccessToken(id: string) {
  return jwt.sign({ id }, Config.Constants.jwtSecret, {
    expiresIn: '30m',
  })
}
