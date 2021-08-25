const Order = require('../models/orderModels')

module.exports = {
	index: function(req, res){
		Order.get(req.con, function(err, rows) {
			res.render('./admin/orders', { data: rows})
		})
	},
	create: function(req, res) {
    	res.render("./admin/ordersCreate")
  	},

  	store: function(req, res) {
    	Order.create(req.con, req.body, function(err) {
      		res.redirect("/admin/orders")
    	})
  	},

  	edit: function(req, res) {
    	Order.getById(req.con, req.params.id, function(err, rows) {
    		
      		res.render("admin/ordersEdit", { data: rows[0] })
    	})
  	},

  	update: function(req, res) {
    	Order.update(req.con, req.body, req.params.id, function(err) {
      		res.redirect("/admin/orders")
    	})
  	},

  	destroy: function(req, res) {
	    Order.destroy(req.con, req.params.id, function(err) {
      		res.redirect("/admin/orders")
    	})
  	}
}