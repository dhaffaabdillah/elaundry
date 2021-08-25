const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')

router.get('/', ordersController.index)
router.get("/create", ordersController.create)
router.post("/", ordersController.store)
router.get("/:id/edit", ordersController.edit)
router.put("/update/:id", ordersController.update)
router.delete("/delete/:id", ordersController.destroy)
module.exports = router