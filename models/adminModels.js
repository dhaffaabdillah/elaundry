module.exports = {

	totalOrders: async function(con, callback) {
		await con.query("SELECT count(NamaCustomers) as totalOrders FROM orders ", callback)
	},
}