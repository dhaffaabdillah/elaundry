// const { customAlphabet } = require('nanoid')
const crypto = require('../utils/crypto');

const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 10);

const userModel = require('./user.model');
const orderModels = require('./orderModels');

const tanggal = new Date()
module.exports = {

	getAll: async function(con, type, callback) {
        if(type == ''){
            await con.query(`SELECT * FROM items INNER JOIN services ON items.serviceId = services.id ORDER BY serviceId ASC`, callback);

        }else{
            await con.query(`SELECT * FROM items INNER JOIN services ON items.serviceId = services.id WHERE serviceId = ? ORDER BY serviceId ASC`, [type], callback);
        }
	},

    getById: async function(con, id, callback) {
        await con.query(`SELECT * FROM items INNER JOIN services ON items.serviceId = services.id WHERE items.id = ?`, [id], callback);
        
	},

    ordersLog: function(con, data, user, callback) {

        // console.log(data, 'jiajeao');

        const userid = user;

		let resi = 'BOD'+nanoid();

        omdata = {
            resi : resi,
            userid : userid
        }
        
        con.query(`INSERT INTO orders SET IdOrders = '${omdata.resi}', Status = 1, usersId = ${omdata.userid}`, function(err) {})


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
                [userid, omdata.resi, data[key].itemsId, data[key].ket, data[key].quantity, price, 1]);

            })
            
        });
        
        
        con.query(`SELECT IdOrders FROM orders WHERE IdOrders = ?`, [omdata.resi], callback);
        
	},

	pembayaran: async function(con, data, callback){
        await con.query(`SELECT services.ServiceName, items.namaItem, orders_log.quantity, orders_log.ket, orders_log.tprice, orders_log.usersId, orders_log.id FROM orders_log INNER JOIN items ON items.id = orders_log.itemsId INNER JOIN services ON services.id = items.serviceId WHERE orders_log.OrdersId = ?`, [data.resi], callback);
	},

    pembayarantotal: async function(con, data, callback){
        console.log(data,'www');
        await con.query(`SELECT SUM(tprice) as total FROM orders_log WHERE orders_log.OrdersId = ?`, [data.resi], callback);
	},

    datauser: async function(con, data, callback){
        await con.query(`SELECT * FROM users WHERE users.ID = ?`, [data], callback);
	},

	pelunasan: async function(con, data, callback){
        await con.query(`UPDATE orders SET totalbayar = ${data[0].totalbayar} Status = 2 WHERE IdOrders = '${data[0].resi}' `)
	},

	deleteOrderPembayaran: async function(con, data, callback) {
        console.log(data.Orders_logId);
        await con.query(`UPDATE orders_log SET status_logId = '${data.status_logId}' WHERE ordersId = '${data.Orders_logId}' AND id = '${data.items_logId}' `, function (err, ro){
            console.log(ro);
        })
	},

	tracker: async function(con, id, callback) {
		await con.query(`SELECT * FROM orders INNER JOIN status_orders ON status_orders.id = orders.Status INNER JOIN users ON users.id = orders.usersId WHERE orders.IdOrders = ?`, [id], callback)
	}
}