require('dotenv').config()

module.exports = (phase) => {
  return {
    target: 'serverless',
    env: {
      BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    },
  }
}
