import express from 'express'

import { ConfigController } from '@app-controllers/Config'

const ConfigRouter = express.Router()

ConfigRouter.route('/paypal').get(ConfigController.getPaypalClientId)

export { ConfigRouter }
