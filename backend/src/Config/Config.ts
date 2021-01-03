import dotenv from 'dotenv'

dotenv.config()

export const Config = {
  IS_DEV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT,
  ALLOWED_ORIGINS: [process.env.FRONTEND_ORIGIN as string],
}
