const pool = require('../utils/db')

module.exports = {
	async listServices()
	{
		try {
	      	conn = await pool.getConnection();
	      	sql = "SELECT * FROM services";
	      	const rows = await conn.query(sql);
	      	conn.end();
	      	return rows;
    	} catch (err) {
	      	throw err;
	    }
	},

	async addService()
	{
		// let serviceName = req.body._serviceName
		// let errors = false
		// try{
		// 	if(serviceName.length === 0) {
		// 		errors = true
		// 		req.flash('error', 'Mohon nama layanan untuk diisi')
		// 		res.render()
		// 	}
		// } catch(err) {
		// 	throw err
		// }
	}
}