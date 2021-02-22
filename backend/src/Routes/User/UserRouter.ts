import express from 'express'

import { UserController } from '@app-controllers/User'
import { authMiddleware } from '@app-middlewares/auth'

const UserRouter = express.Router()

UserRouter.route('/').post(UserController.createUser)
UserRouter.route('/login').post(UserController.authUser)
UserRouter.route('/profile').get(authMiddleware, UserController.getUserProfile)
UserRouter.route('/profile').put(authMiddleware, UserController.updateUserProfile)

export { UserRouter }
