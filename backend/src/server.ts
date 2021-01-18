import express from 'express'
import cors from 'cors'

import { Config } from '@app-config/Config'
import { productRouter } from '@app-routes/product'
import { urlNotFound } from '@app-middlewares/urlNotFound'

Config.Database.connectDB()

const app = express()

app.use(cors({ origin: Config.Constants.allowedOrigins, optionsSuccessStatus: 200 }))

app.use('/api/products', productRouter)

app.use(urlNotFound)

app.listen(Config.Constants.port, () => {
  console.log(
    `Server is running in ${Config.Constants.isDev ? 'dev' : 'prod'} mode at http://localhost:${
      Config.Constants.port
    }`,
  )
})
