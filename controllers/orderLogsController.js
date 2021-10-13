const Order = require('../models/orderModels')

module.exports = {
	index: async function(req, res){
		Order.getLog(req.con, function(err, rows) {
			res.render('./admin/ordersLog', { title : "Order Log | ", data: rows })
			// console.log(rows)
		});
	},

	create: function(req, res) {
		Order.getLog(req.con, function(err, rows){
			res.render('./admin/ordersLogNew', { title : "Add Order Log | ", data: rows })
			// res.redirect('./admin/ordersLogNew', {title: 'Add Log | ', data:rows})	
		})
		
	},

	store: async function(req, res) {
    	Order.create(req.con, req.body, function(err) {
      		res.redirect("/admin/orders")
    	})
  	},

  	update: async function(req, res) {
    	Order.updateOrderLog(req.con, req.body, req.params.id, function(err) {
      		res.redirect("/admin/orders/orders-log")
    	})
  	},

  	edit: async function(req, res) {
    	Order.getLogById(req.con, req.params.id, function(err, rows) {
      		res.render("admin/ordersLogDetail", { title: "Edit Log | ", data: rows[0] })
    	})
  	},
}