module.exports = {
	getUsers: async function(con, callback){
		await con.query(`SELECT * FROM users`, callback)
	},

	getById: async function( con, id, callback ){
		await con.query(`SELECT * FROM users WHERE ID = ${id}`, callback)
	}, 

	create: async function(con, data, callback){
		await con.query(`INSERT INTO  orders SET 
			USERNAME =  '${data._username}' ,
			EMAIL = ' ${data._email} ',
			ROLE = ' ${data._role} ',
			PASS = ' ${data._password} '
			`, callback)
	},

	update: async function(con, data, id, callback) {
		await con.query(
			`UPDATE orders SET 
			USERNAME =  '${data._username}' ,
			EMAIL = ' ${data._email} ',
			ROLE = ' ${data._role} ',
			PASS = ' ${data._password} '
			WHERE ID = ${id}
			`, callback)
	},

	destroy: async function(con, id, callback) {
		await con.query(`DELETE FROM users WHERE ID =  ${id} `, callback)
	},
}