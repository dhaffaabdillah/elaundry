// const Order = require('../models/orderModels')

module.exports = {
	
	index: async function(req, res){
		res.render("./public/index")
	},

	pemesanan_kiloan: async function(req, res){
		res.render("./public/pemesanan", {
			title: 'Kiloan',
			// data:data,
			// path: '/',
		  });
	},

	pemesanan_satuan: async function(req, res){
		res.render("./public/pemesanan", {
			title: 'Satuan',
			// data:data,
			// path: '/',
		  });
	},

	pemesanan_gabungan: async function(req, res){
		res.render("./public/pemesanan", {
			title: 'Gabungan',
			// data:data,
			// path: '/',
		  });
	},

	pembayaran: async function(req, res){
		res.render("./public/pembayaran", {
			title: 'Pembayaran',
			// data:data,
			// path: '/',
		  });
	},

	tracking: async function(req, res){
		res.render("./public/tracking")
	},

	tracker: async function(req, res){
		res.render("./public/tracker")
	},

	dokumen_sk: async function(req, res){
		res.render("./public/s&k", {
			title: 'Syarat dan Ketentuan',
			// data:data,
			// path: '/',
		  });
	},

	dokumen_faq: async function(req, res){
		res.render("./public/faq", {
			title: 'FAQ',
			// data:data,
			// path: '/',
		  });
	},


	
	// create: async function(req, res) {
    // 	res.render("./admin/ordersCreate")
  	// },

  	// store: async function(req, res) {
    // 	Order.create(req.con, req.body, function(err) {
    //   		res.redirect("/admin/orders")
    // 	})
  	// },

  	// edit: async function(req, res) {
    // 	Order.getById(req.con, req.params.id, function(err, rows) {

    //   		res.render("admin/ordersEdit", { data: rows[0] })
    // 	})
  	// },

  	// update: async function(req, res) {
    // 	Order.update(req.con, req.body, req.params.id, function(err) {
    //   		res.redirect("/admin/orders")
    // 	})
  	// },

  	// destroy: async function(req, res) {
	//     Order.destroy(req.con, req.params.id, function(err) {
    //   		res.redirect("/admin/orders")
    // 	})
  	// }
}