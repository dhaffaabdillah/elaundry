const Items = require('../models/publicModels');
const OM = require('../models/orderModels');

function logcheck(status){
	if(!status || status == undefined){
		return "/login"
	}else{
		return "/logout"
	}
}

module.exports = {
	
	index: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/index",{
			cl:cl
		})
	},

	login: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/login",{
			cl:cl
		})
	},

	daftar: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/daftar",{
			cl:cl
		})
	},

	pemesanan_kiloan: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		Items.getAll(req.con, 27, function(err, rows) {
			console.log(rows);
            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Kiloan',	
					data:rows,
					cl:cl
					// path: '/',
				  });
            }
		})
	},

	pemesanan_satuan: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		Items.getAll(req.con, 28, function(err, rows) {
			console.log(rows);

            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Satuan',	
					data:rows,
					cl:cl
					// path: '/',
				  });
            }
		})
	},

	pemesanan_gabungan: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)
		
		Items.getAll(req.con, '', function(err, rows) {
			console.log(rows);

            if(rows.length > 0){
				res.render("./public/pemesanan", {
					title: 'Gabungan',	
					data:rows,
					cl:cl
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

		let cl = logcheck(req.session.isLoggedIn)

		let resii = {
			resi : req.params.resi.toString()
		}
		console.log(resii.resi);

		Items.pembayaran(req.con, resii, function(err, rows) {
			Items.datauser(req.con, rows[0].usersId, function(err2, rows2) {

				Items.pembayarantotal(req.con, resii, function(err3, rows3) {

					if(rows.length > 0){
						console.log(rows3[0].total);
						let tax = parseInt(rows3[0].total) * 20 / 100;
						let wtax = parseInt(rows3[0].total) + (parseInt(rows3[0].total) * 20 / 100);

						res.render("./public/pembayaran", {
							title: 'Pembayaran',
							pembayaran: rows,
							datauser: rows2,
							pembayarantotal: {
								total: rows3[0].total,
								tax: tax,
								wtax: wtax
							},
							resi:resii,
							cl:cl
							// path: '/', 

						  });

					}
				})

			})

		})

	},

	pelunasan: async function(req, res){
		let key = req.body;
		Items.pembayaran(req.con, key, function(err, rows1) {
			console.log(rows1, 'sjasja');
			Items.pembayarantotal(req.con, key, function(err, rows2) {
				Items.pelunasan(req.con, rows1, rows2, key, function(err, rows3) {
					res.redirect("/");
				});
			});
		});
	},

	deleteOrderPembayaran: async function(req, res){
		Items.deleteOrderPembayaran(req.con, req.body, function(err, rows) {
			console.log(rows)
			let tax = parseInt(rows[0].total) * 20 / 100;
			let wtax = parseInt(rows[0].total) + (parseInt(rows[0].total) * 20 / 100);

			res.status(200).send({
				pembayarantotal: {
					total: rows[0].total,
					tax: tax,
					wtax: wtax
				}
			});
		})
	},
	
	tracking: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/tracking",{
			cl:cl
		})
	},

	tracker: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		ordersId = req.body.ordersId;

		OM.getLogResi(req.con, ordersId, function(err, rows1) {
			Items.tracker(req.con, ordersId, function(err, rows2) {
				console.log(rows1, rows2);
				res.render("./public/tracker", {
					data:rows2,
					itemlogs:rows1,
					cl:cl
				})
			})
	  	})
	},

	dokumen_sk: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/s&k", {
			title: 'Syarat dan Ketentuan',
			cl:cl
			// data:data,
			// path: '/',
		  });
	},

	dokumen_faq: async function(req, res){

		let cl = logcheck(req.session.isLoggedIn)

		res.render("./public/faq", {
			title: 'FAQ',
			cl:cl
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