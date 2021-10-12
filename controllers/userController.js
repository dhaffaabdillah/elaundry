const UserModels = require('../models/userModels')

module.exports = {
	index : async function(req, res){
		UserModels.getUsers(req.con, function(err, rows) {
			res.render('admin/user', {title : 'All Users | ' , data : rows})
		});
	},

	create: async function(req, res) {
		res.render('admin/userCreate', {title : 'Add User | ' })
	}, 

	store: async function(req, res) {
    	UserModels.create(req.con, req.body, function(err) {
      		res.redirect("/admin/user-list")
    	})
  	},

  	edit: async function(req, res) {
    	UserModels.getById(req.con, req.params.id, function(err, rows) {
      		res.render("admin/userEdit", { title: "Edit user | ", data: rows[0] })
    	})
  	},

  	show: async function(req, res) {
  		UserModels.getDetailOrder(req.con, req.params.id, function(err,rows){
  			res.render("admin/userDetail", {title: 'Detail UserModels | ', data: rows[0]})
  		})
  	},

  	update: async function(req, res) {
    	UserModels.update(req.con, req.body, req.params.id, function(err) {
      		res.redirect("/admin/user-list")
    	})
  	},

  	destroy: async function(req, res) {
	    UserModels.destroy(req.con, req.params.id, function(err) {
      		res.redirect("/admin/user")
    	})
  	},

}