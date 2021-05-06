require('dotenv').config()

module.exports = (phase) => {
  return {
    env: {
      target: 'serverless',
      BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    },
  }
}
