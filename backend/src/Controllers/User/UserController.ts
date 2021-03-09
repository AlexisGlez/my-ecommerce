import { Request, Response } from 'express'

import { UserDocument, UserModel } from '@app-models/User'
import { RequestWithUser } from '@app-middlewares/auth'

import { generateAccessToken } from './utils/generateAccessToken'

export class UserController {
  public static async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body

    if (!name) {
      res.status(400).json({ data: null, message: 'Missing name in request.' })
      return
    }

    if (!email) {
      res.status(400).json({ data: null, message: 'Missing email in request.' })
      return
    }

    if (!UserController.isValidEmail(email)) {
      res.status(400).json({ data: null, message: 'Invalid email provided.' })
      return
    }

    if (!password) {
      res.status(400).json({ data: null, message: 'Missing password in request.' })
      return
    }

    try {
      const userExists = await UserModel.findOne({ email })

      if (userExists) {
        res.status(400).json({ data: null, message: 'User already exists.' })
        return
      }

      const user = await UserModel.create({ name, email, password })

      if (!user) {
        res.status(400).json({ data: null, message: 'Invalid user data.' })
        return
      }

      res.status(201).json({ data: UserController.getUserData(user) })
    } catch (error) {
      console.error('An error happened while creating a new user:', error)
      res.status(500).json({ data: null, message: 'Unable to create user.' })
    }
  }

  private static isValidEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

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

      res.status(200).json({ data: UserController.getUserData(user) })
    } catch (error) {
      console.error('An error happened while retrieving the user:', error)
      res.status(500).json({ data: null, message: 'Unable to find user.' })
    }
  }

  public static async getUserProfile(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    try {
      const user = await UserModel.findById(req.user._id)

      if (!user) {
        res.status(404).json({ data: null, message: 'Not user found.' })
        return
      }

      res.status(200).json({ data: UserController.getUserPublicData(user) })
    } catch (error) {
      console.error("An error happened while retrieving the user's data:", error)
      res.status(500).json({ data: null, message: "Unable get user's data." })
    }
  }

  public static async getUsers(_: RequestWithUser, res: Response) {
    try {
      const users = await UserModel.find({})
      res.status(200).json({ data: users })
    } catch (error) {
      console.error('An error happened while retrieving users:', error)
      res.status(500).json({ data: null, message: 'Unable get users data.' })
    }
  }

  public static async updateUserProfile(req: RequestWithUser, res: Response) {
    if (!req.user?._id) {
      res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' })
      return
    }

    try {
      const user = await UserModel.findById(req.user._id)

      if (!user) {
        res.status(404).json({ data: null, message: 'Not user found.' })
        return
      }

      user.name = req.body.name || user.name
      if (req.body.password) {
        // Only set password if there is a new one provided so the user model does not hash the password again.
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.status(200).json({ data: UserController.getUserData(updatedUser) })
    } catch (error) {
      console.error("An error happened while updating the user's data:", error)
      res.status(500).json({ data: null, message: "Unable to update user's data." })
    }
  }

  private static getUserPublicData(user: UserDocument) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  private static getUserData(user: UserDocument) {
    return {
      ...UserController.getUserPublicData(user),
      token: generateAccessToken(user._id),
    }
  }
}
