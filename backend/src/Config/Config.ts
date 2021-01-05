import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

class Constants {
  public static readonly isDev = process.env.NODE_ENV !== 'production'
  public static readonly port = process.env.PORT
  public static readonly allowedOrigins = [process.env.FRONTEND_ORIGIN as string]
}

class Database {
  public static async connectDB() {
    try {
      const conn = await mongoose.connect(process.env.DB_URI as string, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })

      console.log(`MongoDB Connected at: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Unable to connect to DB: ${error}`)
      process.exit(1)
    }
  }
}

export const Config = {
  Constants,
  Database,
}
