const jwt = require('jsonwebtoken')
require('dotenv').config()

const genneralToken = async (payload) => {
  const token = jwt.sign(
    {
      ...payload
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  return token
}

module.exports = {
  genneralToken
}
