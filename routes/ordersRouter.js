const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

router.get('/', ordersController.index)
module.exports = router