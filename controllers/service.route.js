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
	conn.query('INSERT INTO services (ServiceName) VALUES (?) ', [req.body._serviceName], function(err, results){})
	res.redirect('../');
	conn.end();
})

router.post('/delete/:id', async function(req, res) {
	let serviceId = [req.params.id];
	
	conn = await pool.getConnection();
	conn.query('DELETE FROM services WHERE Id = ? ', serviceId, function(err, res) {});
	res.redirect('../');
	conn.end();
})

module.exports = router  
