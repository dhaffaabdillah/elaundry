const Order = require('../models/orderModels')

module.exports = {
	index: function(req, res){
		Order.get(req.con, function(err, rows) {
			res.render('admin/orders', { data: rows})
		})
	}
}