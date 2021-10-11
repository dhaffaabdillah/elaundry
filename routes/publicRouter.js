const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const publicController = require('../controllers/publicController')

router.get('/', publicController.index)
router.get("/create", publicController.create)
router.post("/", publicController.store)
router.get("/:id/edit", publicController.edit)
router.put("/update/:id", publicController.update)
router.delete("/delete/:id", publicController.destroy)
module.exports = router