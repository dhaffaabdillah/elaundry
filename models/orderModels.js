const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 10)
const tanggal = new Date()
module.exports = {

	get: async function(con, callback) {
		await con.query("SELECT * FROM orders", callback)
	},

	getById: async function(con, id, callback){
		await con.query(`SELECT * FROM orders WHERE Id = ${id}`, callback)
	},

	getStatusProgress: async function(con, callback){
		await con.query(`SELECT * FROM status_orders`, callback)
	},

	create: async function(con, data, callback){
		await con.query(`INSERT INTO  orders SET 
			IdOrders =  '${nanoid()}' ,
			NamaCustomers = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			`, callback)
	},

	update: async function(con, data, id, callback) {
		await con.query(
			`UPDATE orders SET 
			NamaCustomers = ' ${data._custName} ',
			Status = ' ${data._orderProgress} ',
			Alamat = ' ${data._custAddress} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			WHERE Id = ${id} `,
		callback)
	},

	destroy: async function(con, id, callback) {
		await con.query(`DELETE FROM orders WHERE Id =  ${id} `, callback)
	}
}