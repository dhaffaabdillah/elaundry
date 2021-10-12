const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const userController = require('../controllers/userController')

router.get('/', auth.checkAuthentication("ADMIN"), userController.index)
router.get("/create", auth.checkAuthentication("ADMIN"), userController.create)
router.get("/:id/edit",auth.checkAuthentication("ADMIN"),  userController.edit)
router.get("/:id/detail",auth.checkAuthentication("ADMIN"),  userController.show)

router.post("/", auth.checkAuthentication("ADMIN"), userController.store)
router.put("/update/:id",auth.checkAuthentication("ADMIN"),  userController.update)
router.delete("/delete/:id",auth.checkAuthentication("ADMIN"),  userController.destroy)
module.exports = router