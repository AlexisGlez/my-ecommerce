import path from 'path'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

console.log(__dirname)

import { Config } from '@app-config/Config'
import { ProductRouter } from '@app-routes/Product'
import { UserRouter } from '@app-routes/User'
import { OrderRouter } from '@app-routes/Order'
import { ConfigRouter } from '@app-routes/Config'
import { FileUploaderRouter } from '@app-routes/FileUploader'
import { urlNotFound } from '@app-middlewares/urlNotFound'

Config.Database.connectDB()

const app = express()

if (Config.Constants.isDev) {
  app.use(morgan('dev'))
}

app.use(cors({ origin: Config.Constants.allowedOrigins, optionsSuccessStatus: 200 }))
app.use(express.json())

app.use('/api/products', ProductRouter)
app.use('/api/users', UserRouter)
app.use('/api/orders', OrderRouter)
app.use('/api/config', ConfigRouter)
app.use('/api/upload', FileUploaderRouter)
app.use('/api/images', express.static(path.join(__dirname, '../uploads')))

app.use(urlNotFound)

app.listen(Config.Constants.port, () => {
  console.log(
    `Server is running in ${Config.Constants.isDev ? 'dev' : 'prod'} mode at http://localhost:${
      Config.Constants.port
    }`,
  )
})
