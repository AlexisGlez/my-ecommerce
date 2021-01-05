import express from 'express'
import cors from 'cors'

import { Config } from '@app-config/Config'

import products from './data/products'

Config.Database.connectDB()

const app = express()

app.use(cors({ origin: Config.Constants.allowedOrigins, optionsSuccessStatus: 200 }))

app.get('/', (_, res) => res.send('Express + TypeScript Server'))

app.get('/api/products', (_, res) => res.json(products))

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(Config.Constants.port, () => {
  console.log(
    `Server is running in ${Config.Constants.isDev ? 'dev' : 'prod'} mode at http://localhost:${
      Config.Constants.port
    }`,
  )
})
