import express from 'express'

import { UserController } from '@app-controllers/User'

const UserRouter = express.Router()

UserRouter.route('/login').post(UserController.authUser)

export { UserRouter }
