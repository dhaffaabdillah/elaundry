const express  = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const servicesModel = require('../models/services.model')
const pool = require('../utils/db')
const auth = require('../utils/auth')

router.get("/", auth.checkAuthentication("ADMIN"), async function (request, response) {
  	let userData = await userModel.read(request.user.username);
  	let listData = await servicesModel.listServices();
	response.render("admin/services", {
    	user: userData,
    	data: listData,
    	type: "ADMIN",
  	});
});

router.get("/new", auth.checkAuthentication("ADMIN"), async function (request, response) {
  	let userData = await userModel.read(request.user.username);
  	let listData = await servicesModel.listServices();
	response.render("admin/addServices", {
    	user: userData,
    	data: listData,
    	type: "ADMIN",
  	});
});

router.post('/submit', async function(req, res) {
	let serviceName = req.body._serviceName
	conn = await pool.getConnection()
	rows = conn.query('INSERT INTO services (ServiceName) VALUES (?) ', [req.body._serviceName], function(err, results){
		res.redirect('admin/services')
	})
	conn.end()
  	return rows
})

router.post('/delete:id', async function(req, res) {
	conn = await pool.getConnection()
	serviceId = [req.params.id]
	rows = conn.query('DELETE FROM services WHERE Id = ? ', serviceId, function(err, res) {
		res.redirect('admin/services')
	})
	conn.end()
  	return rows
})

module.exports = router  
