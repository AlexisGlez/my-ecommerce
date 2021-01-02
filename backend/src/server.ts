import express from 'express'
import cors from 'cors'

import products from './data/products'

const app = express()

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))

const PORT = 8000

app.get('/', (_, res) => res.send('Express + TypeScript Server'))

app.get('/api/products', (_, res) => res.json(products))

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
