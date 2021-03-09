import express from 'express'

import { UserController } from '@app-controllers/User'
import { authMiddleware } from '@app-middlewares/auth'
import { adminMiddleware } from '@app-middlewares/admin'

const UserRouter = express.Router()

UserRouter.route('/').post(UserController.createUser)
UserRouter.route('/').get(authMiddleware, adminMiddleware, UserController.getUsers)
UserRouter.route('/login').post(UserController.authUser)
UserRouter.route('/profile').get(authMiddleware, UserController.getUserProfile)
UserRouter.route('/profile').patch(authMiddleware, UserController.updateUserProfile)
UserRouter.route('/:id').delete(authMiddleware, adminMiddleware, UserController.deleteUser)

export { UserRouter }
