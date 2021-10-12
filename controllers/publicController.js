const Items = require('../models/publicModels')

module.exports = {
	
	index: async function(req, res){
		res.render("./public/index")
	},

	login: async function(req, res){
		res.render("./public/login")
	},

	daftar: async function(req, res){
		res.render("./public/daftar")
	},

	pemesanan_kiloan: async function(req, res){
		Items.getAll(req.con, 27, function(err, rows) {
			console.log(rows);
            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Kiloan',	
					data:rows,
					// path: '/',
				  });
            }
		})
	},

	pemesanan_satuan: async function(req, res){
		Items.getAll(req.con, 28, function(err, rows) {
			console.log(rows);

            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Satuan',	
					data:rows,
					// path: '/',
				  });
            }
		})
	},

	pemesanan_gabungan: async function(req, res){
		Items.getAll(req.con, '', function(err, rows) {
			console.log(rows);

            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Gabungan',	
					data:rows,
					// path: '/',
				  });
            }
		})
	},

	pemesanan: async function(req, res){

		items = req.body;

		let itemsOrder = [];

		Object.keys(items).forEach(key => {
			// console.log(key, items[key]);

			if(items[key] != '' || items[key] != 0){
				// Satuan
				if(key.includes('_')){
								
					let item = key.split('_');

					console.log(item);
					itemsOrder.push({
						itemsId : item[0],
						quantity : items[key],
						ket : item[1]
					});


				} else {
					// Kiloan
					itemsOrder.push({
						itemsId : key,
						quantity : items[key],
						ket : 'Kg'
					});
				}
			}

		});

		console.log(req.session.isLoggedIn);

		if(req.session.isLoggedIn == true || req.session.isLoggedIn != undefined){
			let user = req.session.user;
			
			Items.ordersLog(req.con, itemsOrder, user, function(err, rows) {
				res.redirect(`/pembayaran/${rows[0].IdOrders}`);
			})
			console.log(itemsOrder);

		}else{
			req.session.tmpordrsv = itemsOrder;
			console.log(req.session.tmpordrsv);
			res.redirect('/login');
		}


		// Items.getAll(req.con, '', function(err, rows) {
		// 	console.log(rows);

        //     if(rows.length > 0){
		// 		res.render("./public/pemesanan", {
		// 			title: 'Gabungan',	
		// 			data:rows,
		// 			// path: '/',
		// 		  });
        //     }
		// })
	},

	pembayaran: async function(req, res){


		Items.pembayaran(req.con, req.params.resi, function(err, rows) {

			Items.datauser(req.con, rows[0].usersId, function(err2, rows2) {

				Items.pembayarantotal(req.con, req.params.resi, function(err3, rows3) {

					if(rows.length > 0){
						// console.log(rows2)	
						res.render("./public/pembayaran", {
							title: 'Pembayaran',
							pembayaran: rows,
							datauser: rows2,
							pembayarantotal: rows3,
							resi:req.params.resi
							// path: '/', 
							

						  });

					}
				})

			})

		})

	},

	pelunasan: async function(req, res){

		let bon = [];

		let key = req.body.totalbayar;

		let item = key.split('_');

		bon.push({
			totalbayar : item[0],
			resi : item[1]
		});

		Items.pelunasan(req.con, bon, function(err, rows) {
			res.redirect("/")
		})
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