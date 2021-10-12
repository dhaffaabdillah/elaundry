const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const publicController = require('../controllers/publicController')

router.get('/', publicController.index);
router.get('/index', publicController.index);

router.get('/pemesanan/kiloan', publicController.pemesanan_kiloan);
router.get('/pemesanan/satuan', publicController.pemesanan_satuan);
router.get('/pemesanan/gabungan', publicController.pemesanan_gabungan);

router.get('/tracking', publicController.tracking);
router.get('/tracking/status', publicController.tracker);


router.get('/pembayaran', publicController.pembayaran);


router.get('/dokumen-s&k', publicController.dokumen_sk);
router.get('/dokumen-faq', publicController.dokumen_faq);




// router.get("/create", publicController.create);
// router.post("/", publicController.store);
// router.get("/:id/edit", publicController.edit);
// router.put("/update/:id", publicController.update);
// router.delete("/delete/:id", publicController.destroy);




module.exports = router