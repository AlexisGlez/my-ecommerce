require('dotenv').config()

module.exports = (phase) => {
  return {
    env: {
      BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    },
  }
}
