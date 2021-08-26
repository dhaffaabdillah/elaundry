const Order = require('../models/orderModels')

module.exports = {
	index: async function(req, res){
		Order.get(req.con, function(err, rows) {
			res.render('./admin/orders', { title: "All Orders | ",  data: rows})
		})
	},
	create: async function(req, res) {
    	res.render("./admin/ordersCreate")
  	},

  	store: async function(req, res) {
    	Order.create(req.con, req.body, function(err) {
      		res.redirect("/admin/orders")
    	})
  	},

  	edit: async function(req, res) {
    	Order.getById(req.con, req.params.id, function(err, rows) {

      		res.render("admin/ordersEdit", { data: rows[0] })
    	})
  	},

  	update: async function(req, res) {
    	Order.update(req.con, req.body, req.params.id, function(err) {
      		res.redirect("/admin/orders")
    	})
  	},

  	destroy: async function(req, res) {
	    Order.destroy(req.con, req.params.id, function(err) {
      		res.redirect("/admin/orders")
    	})
  	}
}