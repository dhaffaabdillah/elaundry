// const { customAlphabet } = require('nanoid')
const crypto = require('../utils/crypto');
const tanggal = new Date()
module.exports = {

	checklogin: async function(con, type, data, callback) {

        console.log(crypto.crypt(data.password));
        if(type == 1){
		    await con.query(`SELECT * FROM users WHERE NOMORTELEPON = '${data.credentials.toString()}' AND PASS = '${crypto.crypt(data.password.toString())}' `, callback);
        }else{
		    await con.query(`SELECT * FROM users WHERE EMAIL = '${data.credentials.toString()}' AND PASS = '${crypto.crypt(data.password.toString())}'`, callback);
        }

	},

    check: async function(con, data, callback) {
        try {
		    await con.query(`SELECT * FROM users WHERE NOMORTELEPON = ${data} `, callback);
        } catch (error) {
            console.log(error);
        }
	},

	regist: async function(con, data, callback){
        try {
		    await con.query(`INSERT INTO users (EMAIL, NOMORTELEPON, NAMALENGKAP, KODEPOS, ALAMAT, ROLE, PASS) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                            [data.email, data.notelp, data.namalengkap, data.kodepos, data.alamat, 'USER', crypto.crypt(data.password)], callback)
        } catch (error) {
            console.log(error);
        }
	},

	update: async function(con, data, id, callback) {
		await con.query(
			`UPDATE orders SET 
			NamaCustomers = ' ${data._custName} ',
			Alamat = ' ${data._address} ',
			NoTelp = ' ${data._noTel} ',
			Email = ' ${data._email} '
			WHERE Id = ${id} `,
		callback)
	},

	destroy: async function(con, id, callback) {
		await con.query(`DELETE FROM orders WHERE Id =  ${id} `, callback)
	}
}