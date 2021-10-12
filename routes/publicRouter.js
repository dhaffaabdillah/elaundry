const express = require('express')
const router = express.Router()
const auth = require('../utils/auth')
const publicController = require('../controllers/publicController')
const publicLoginController = require('../controllers/publicLoginController')
const sessioncheck = require('../utils/sessioncheck');

router.get('/', publicController.index);
router.get('/index', publicController.index);

router.get('/login', publicController.login);
router.get('/daftar', publicController.daftar);

router.post('/daftar', publicLoginController.daftarbaru);
router.post('/login', publicLoginController.loginakun)

router.get('/pemesanan/kiloan', publicController.pemesanan_kiloan);
router.get('/pemesanan/satuan', publicController.pemesanan_satuan);
router.get('/pemesanan/gabungan', publicController.pemesanan_gabungan);

router.post('/pemesanan', publicController.pemesanan);

router.post('/pelunasan', publicController.pelunasan);

router.get('/tracking', publicController.tracking);
router.post('/tracking/status/', publicController.tracker);


router.get('/pembayaran/:resi', publicController.pembayaran);
router.post('/deleteOrderPembayaran', publicController.deleteOrderPembayaran);


router.get('/dokumen-s&k', publicController.dokumen_sk);
router.get('/dokumen-faq', publicController.dokumen_faq);




// router.get("/create", publicController.create);
// router.post("/", publicController.store);
// router.get("/:id/edit", publicController.edit);
// router.put("/update/:id", publicController.update);
// router.delete("/delete/:id", publicController.destroy);




module.exports = router