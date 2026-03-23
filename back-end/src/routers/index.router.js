const express = require('express')
const router = express.Router()

const userRouter = require('../routers/user.router')
const categoryRouter = require('../routers/category.router')
const productRouter = require('../routers/product.router')
const aboutUsRouter = require('../routers/about-us.router')
const contactUsRouter = require('../routers/contact-us.router')
const policyRouter = require('../routers/policy.routes')
const mailerRouter = require('../routers/mailer.router')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/about-us', aboutUsRouter)
router.use('/contact-us', contactUsRouter)
router.use('/policy', policyRouter)
router.use('/mailer', mailerRouter)

module.exports = router
