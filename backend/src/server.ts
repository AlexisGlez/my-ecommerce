import express from 'express'
import products from './data/products'

const app = express()
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
