import { Request, Response } from 'express'

import { UserModel } from '@app-models/User'

export class UserController {
  public static async authUser(req: Request, res: Response) {
    const { email, password } = req.body

    if (!email) {
      res.status(400).json({ data: null, message: 'Missing email in request.' })
      return
    }

    if (!password) {
      res.status(400).json({ data: null, message: 'Missing password in request.' })
      return
    }

    try {
      const user = await UserModel.findOne({ email })

      const isValidPassword = user && (await user.matchPassword(password))

      if (!user || !isValidPassword) {
        res.status(401).json({ data: null, message: 'Invalid user or password.' })
        return
      }

      res.status(200).json({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: null,
        },
      })
    } catch (error) {
      console.error('An error happened while retrieving the user:', error)
      res.status(500).json({ data: null, message: 'Unable to find user.' })
    }
  }
}
