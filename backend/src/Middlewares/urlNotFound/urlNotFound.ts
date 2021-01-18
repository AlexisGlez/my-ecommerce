import { Request, Response, NextFunction } from 'express'

export const urlNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`URL not found: ${req.originalUrl}`)
  res.status(404).json({ message: 'URL not found.' })
  next(error)
}
