import { Response, NextFunction } from 'express'

import { RequestWithUser } from '@app-src/Middlewares/auth'

export const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user?.isAdmin) {
    next()
  } else {
    res.status(401).json({ data: null, message: 'Unauthorized.' })
    return
  }
}
