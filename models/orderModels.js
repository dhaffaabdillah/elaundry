const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 10);

const userModel = require('./user.model');
const orderModels = require('./orderModels');

const tanggal = new Date()

// const userid = req.session.user;
		

module.exports = {

	get: async function(con, callback) {
		// await con.query("SELECT NamaCustomers, IdOrders, Alamat, NoTelp, Email, status_orders.NamaStatus FROM orders JOIN status_orders ON status_orders.IdStatus = orders.Status ", callback)
		await con.query("SELECT * FROM orders", callback)
	},

	getById: async function(con, id, callback){
		await con.query(`SELECT * FROM orders WHERE Id = ${id}`, callback)
	},

	getDetailOrder: async function(con, id, callback){
		await con.query(`SELECT users.NAMALENGKAP as NamaCustomers, orders.IdOrders, users.ALAMAT as Alamat, users.NOMORTELEPON as NoTelp, users.EMAIL as Email, status_orders.NamaStatus FROM orders JOIN status_orders ON status_orders.Id = orders.Status JOIN users ON users.id = orders.usersId WHERE orders.Id = ${id}`, callback)
	},

	getStatusProgress: async function(con, callback){
		await con.query(`SELECT * FROM status_orders`, callback)
	},

	create: async function(con, data, callback){
		
		console.log(data);

        await con.query(`INSERT INTO orders SET IdOrders = '${data.resi}', Status = 1, usersId = ${data.userid}`, callback)

		// await con.query(`INSERT INTO  orders SET 
		// 	IdOrders =  'BOD${nanoid()}' ,
		// 	NamaCustomers = ' ${data._custName} ',
		// 	Alamat = ' ${data._address} ',
		// 	NoTelp = ' ${data._noTel} ',
		// 	Email = ' ${data._email} '
		// 	`, callback)
	},

	destroy: async function(con, id, callback) {
		await con.query(`DELETE FROM orders WHERE Id =  ${id} `, callback)
	},

	getLog: async function (con,callback) {
		await con.query(`SELECT users.NAMALENGKAP as NamaCustomers, users.ID AS userId, status.status_log AS NamaStatus, log.id as id, log.ordersId, items.NamaItem, log.ket, log.quantity, log.tprice  FROM orders_log AS log LEFT JOIN items ON items.id = log.itemsId LEFT JOIN status_log AS status ON status.Id = log.status_logId JOIN users ON users.id = log.usersId ORDER BY ordersId ASC, status_logId`, callback)		
	},

    getLogResi: async function (con, resi, callback) {
        console.log(resi);
		await con.query(`SELECT users.NAMALENGKAP as NamaCustomers, users.ID AS userId, status.status_log AS NamaStatus, log.id as id, log.ordersId, items.NamaItem, log.ket, log.quantity, log.timestamp, log.tprice  FROM orders_log AS log LEFT JOIN items ON items.id = log.itemsId LEFT JOIN status_log AS status ON status.Id = log.status_logId JOIN users ON users.id = log.usersId WHERE log.ordersId = "${resi}" ORDER BY ordersId ASC, status_logId`, callback)		
	},

	createLog: async function(con, data, callback){
		await con.query(`INSERT INTO  orders_log SET 
			ordersId =  '${nanoid()}' ,
			usersId = ' ${data._userId} ',
			itemsId = ' ${data._itemsId} ',
			quantity = ' ${data._qty} ',
			ket = '${data._ket}',
			status_logId = ' ${data._status} '
			`, callback)
	},

	getLogById: async function(con, id, callback){
		await con.query(`SELECT users.NAMALENGKAP as NamaCustomers, users.EMAIL AS Email, users.ALAMAT AS Alamat, users.KODEPOS AS KodePos, users.NOMORTELEPON AS NoTelp, status.status_log AS NamaStatus,log.id as id, log.ordersId, items.NamaItem, log.ket, log.quantity, log.tprice  FROM orders_log AS log LEFT JOIN items ON items.id = log.itemsId LEFT JOIN status_log AS status ON status.Id = log.status_logId JOIN users ON users.id = log.usersId  WHERE log.id = ${id}`, callback)
	},

	updateOrderLog: async function(con, data, id, callback) {
		await con.query(
			`UPDATE orders_log SET 
			status_logId = ' ${data._orderLogProgress} ',
			WHERE id = ${id} `,
		callback)
	},

	ordersLog: async function(con, data, user, callback) {

        // console.log(data, 'jiajeao');

        const userid = user;

		let resi = 'BOD'+nanoid();

        omdata = {
            resi : resi,
            userid : userid
        }
        
        con.query(`INSERT INTO orders SET IdOrders = '${omdata.resi}', Status = 1, usersId = ${omdata.userid}`, function(err) {

            console.log(err);

            Object.keys(data).forEach(key => {
			console.log(data[key], 'asdjkaok');

            let itemsdetail;

            con.query(`SELECT * FROM items WHERE items.id = ${data[key].itemsId}`, function(err, rows){
                console.log(rows, 'sioaia');
                itemsdetail = rows[0] 

                let price = 0;

                switch(data[key].ket) {
                    case "S":
                        price += data[key].quantity*itemsdetail.hargaS;
                        break;
                    case "M":
                        price += data[key].quantity*itemsdetail.hargaM;
                        break;
                    case "L":
                        price += data[key].quantity*itemsdetail.hargaL;
                        break;
                    case "Kg":
                        price += data[key].quantity*itemsdetail.hargaKg;
                        break;
                  }
    
    
                con.query(`INSERT INTO orders_log (usersId, ordersId, itemsId, ket, quantity, tprice, status_logId) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [userid, omdata.resi, data[key].itemsId, data[key].ket, data[key].quantity, price, 1], callback);
                
                });

                
                // let itemsdetail;

                // if(items[key] != '' || items[key] != 0){
                // 	// Satuan
                // 	if(key.includes('_')){
                                    
                // 		let item = key.split('_');

                // 		console.log(item);
                // 		itemsOrder.push({
                // 			itemsId : item[0],
                // 			quantity : items[key],
                // 			ket : item[1]
                // 		});

                // 		// console.log(key, items[key], 'satuan');

                // 	} else {
                // 		// Kiloan
                // 		itemsOrder.push({
                // 			itemsId : key,
                // 			quantity : items[key],
                // 			ket : 'Kg'
                // 		});
                // 	}
                // }

            });

        })

        
        console.log(omdata.resi);

        con.query(`SELECT IdOrders FROM orders WHERE IdOrders = ?`, [omdata.resi], callback);
        
	},
}