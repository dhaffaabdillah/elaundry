// const pool = require('../utils/db.js')
// const {nanoid} = require('nanoid')
// const orderId = nanoid(6)

module.exports = {

	get: function(con, callback) {
		con.query("SELECT * FROM orders", callback)
	},

	getById: function(con, callback, data){
		con.query(`SELECT * FROM orders WHERE Id = ${id}`, callback)
	},

	create: function(con, callback, data){
		con.query(`INSERT INTO  orders SET 
			IdOrders = ' ${ data._id } ',
			NamaCustomer = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			`, callback)
	},

	update: function(con, callback, data, id) {
		con.query(`UPDATE orders SET 
			NamaCustomer = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} ',
			WHERE Id = ' ${id} '`, callback)
	},

	delete: function(con, callback, id) {
		con.query(`DELETE orders WHERE Id = ' ${id} '`, callback)
	}
}