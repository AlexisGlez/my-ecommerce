import dotenv from 'dotenv'

import { User } from '@app-models/User'
import { Product } from '@app-models/Product'
import { Order } from '@app-models/Order'
import { Config } from '@app-config/Config'

import users from './data/users'
import products from './data/products'

dotenv.config()

// Fills the DB with mock data
async function fillDB() {
  try {
    await emptyDB()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers.find((user) => user.isAdmin)

    if (!adminUser) {
      throw new Error('No admin user found!')
    }

    const productsWithOwner = products.map((product) => ({ ...product, user: adminUser }))

    await Product.insertMany(productsWithOwner)

    console.log('Data Imported Successfully!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Deletes all the data from the DB.
async function emptyDB() {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Deleted Successfully!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

async function main() {
  await Config.Database.connectDB()

  const isEmptyFlag = process.argv[2] === '-e'

  isEmptyFlag ? await emptyDB() : await fillDB()

  process.exit()
}

main()
