import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { UserModel, UserDocument } from '@app-models/User'
import { Config } from '@app-src/Config'

export type RequestWithUser = Request & {
  user?: Omit<UserDocument, 'password'> | null
}

type DecodedToken = {
  id: string
  iat: number
  exp: number
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token: string | undefined

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401).json({ data: null, message: 'No access token found.' })
    return
  }

  try {
    const decoded = jwt.verify(token, Config.Constants.jwtSecret) as DecodedToken

    req.user = await UserModel.findById(decoded.id).select('-password')
  } catch (error) {
    console.error('An error happened while decoding the access token:', error)
    res.status(401).json({ data: null, message: 'Unauthorized, invalid token.' })
    return
  }

  next()
}
