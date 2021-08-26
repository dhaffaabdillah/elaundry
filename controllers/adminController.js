const Admin = require('../models/adminModels')

module.exports = {
	index: async function(req, res){
		Admin.totalOrders(req.con, function(err, rows) {
			res.render('./admin/adminDashboard', {title : "Admin Dashboard | ",  data : rows})
			// console.log({data:rows})
		})
	}
}