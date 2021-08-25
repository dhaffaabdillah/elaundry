// const pool = require('../utils/db.js')
// import { customAlphabet } from 'nanoid'
// const {nanoid} = require('nanoid')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
const tanggal = new Date()
module.exports = {

	get: function(con, callback) {
		con.query("SELECT * FROM orders", callback)
	},

	getById: function(con, id, callback){
		con.query(`SELECT * FROM orders WHERE Id = ${id}`, callback)
	},

	create: function(con, data, callback){
		con.query(`INSERT INTO  orders SET 
			IdOrders =  '${nanoid()}' ,
			NamaCustomers = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			`, callback)
	},

	update: function(con, data, id, callback) {
		con.query(
			`UPDATE orders SET 
			NamaCustomers = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			WHERE Id = ${id} `,
		callback)
	},

	destroy: function(con, id, callback) {
		con.query(`DELETE FROM orders WHERE Id =  ${id} `, callback)
	}
}