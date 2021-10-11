const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const ordersController = require('../controllers/ordersController')

router.get('/', auth.checkAuthentication("ADMIN"), ordersController.index)
router.get("/create", auth.checkAuthentication("ADMIN"), ordersController.create)
router.post("/", auth.checkAuthentication("ADMIN"), ordersController.store)
router.get("/:id/edit",auth.checkAuthentication("ADMIN"),  ordersController.edit)
router.get("/:id/detail",auth.checkAuthentication("ADMIN"),  ordersController.show)
router.put("/update/:id",auth.checkAuthentication("ADMIN"),  ordersController.update)
router.delete("/delete/:id",auth.checkAuthentication("ADMIN"),  ordersController.destroy)
module.exports = router