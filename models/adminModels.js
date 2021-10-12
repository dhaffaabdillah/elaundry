module.exports = {

	totalOrders: async function(con, callback) {
		await con.query("SELECT count(Id) as totalOrders FROM orders ", callback)
	},
}