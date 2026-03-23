const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorizeUser = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization ||
      req.headers.token ||
      req.headers.Authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing. Authorization denied.'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await UserModel.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid access token. Authorization denied.'
    })
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization ||
      req.headers.token ||
      req.headers.Authorization

    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token missing. Authorization denied.'
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const admin = await UserModel.findById(decoded.id)

    if (!admin) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' })
    }

    if (admin.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Chỉ admin mới có quyền truy cập' })
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: 'Đã xảy ra lỗi', error })
  }
}

module.exports = { authorizeUser, isAdmin }
