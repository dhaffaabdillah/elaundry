const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const adminController = require('../controllers/adminController')

router.get('/', auth.checkAuthentication("ADMIN"), adminController.index)

module.exports = router