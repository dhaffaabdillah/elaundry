const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const ordersController = require('../controllers/ordersController')

router.get('/', auth.checkAuthentication("ADMIN"), ordersController.index)
router.get("/create", auth.checkAuthentication("ADMIN"), ordersController.create)
router.post("/", auth.checkAuthentication("ADMIN"), ordersController.store)
router.get("/:id/edit",  ordersController.edit)
router.put("/update/:id",  ordersController.update)
router.delete("/delete/:id",  ordersController.destroy)
module.exports = router