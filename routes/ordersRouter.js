const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const ordersController = require('../controllers/ordersController')

router.get('/', ordersController.index)
router.get("/create", auth.checkAuthentication("ADMIN"), ordersController.create)
router.post("/", auth.checkAuthentication("ADMIN"), ordersController.store)
router.get("/:id/edit", auth.checkAuthentication("ADMIN"), ordersController.edit)

router.put("/update/:id", auth.checkAuthentication("ADMIN"), ordersController.update)
router.delete("/delete/:id", auth.checkAuthentication("ADMIN"), ordersController.destroy)
module.exports = router