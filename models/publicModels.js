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
        console.log(data);
        await con.query(`SELECT services.ServiceName, items.namaItem, orders_log.quantity, orders_log.ket, orders_log.itemsId, orders_log.tprice, orders_log.usersId, orders_log.id FROM orders_log INNER JOIN items ON items.id = orders_log.itemsId INNER JOIN services ON services.id = items.serviceId WHERE orders_log.OrdersId = ? AND orders_log.status_logId = 1`, [data.resi], callback);
	},

    pembayarantotal: function(con, data, callback){
        console.log(data,'www');
        con.query(`SELECT SUM(tprice) as total FROM orders_log WHERE orders_log.OrdersId = ? AND orders_log.status_logId = 1`, [data.resi], callback);
	},

    datauser: function(con, data, callback){
        con.query(`SELECT * FROM users WHERE users.ID = ?`, [data], callback);
	},

	pelunasan: function(con, data1, data2, data3, callback){

        let wtax;
        wtax = parseInt(data2[0].total) + (parseInt(data2[0].total) * 20 / 100);

        console.log(data1, data2, data3)

        Object.keys(data1).forEach(key => {
            console.log(data1[key], 'asdjkaok');
    
            con.query(`SELECT * FROM items WHERE items.id = ${data1[key].itemsId}`, function(err, rows){
            
                // let price = 0;
    
                con.query(`INSERT INTO orders_log (usersId, ordersId, itemsId, ket, quantity, tprice, status_logId) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [data1[key].usersId, data3.resi, data1[key].itemsId, data1[key].ket, data1[key].quantity, data1[key].tprice, 2]);

            })
                
        });

        con.query(`UPDATE orders SET totalbayar = ${wtax}, metodeBayarId = 1, Status = 2 WHERE IdOrders = "${data3.resi}" `, callback)

	},

	deleteOrderPembayaran: async function(con, data, callback) {
        console.log(data.Orders_logId);
        let resi = {
            resi:data.Orders_logId
        }

        await this.pembayaran(con, resi, function(err, row){

            Object.keys(row).forEach(key => {

                let price = 0;
    
                // switch(row[key].ket) {
                //     case "S":
                //         price += row[key].quantity*row[key].hargaS;
                //         break;
                //     case "M":
                //         price += row[key].quantity*row[key].hargaM;
                //         break;
                //     case "L":
                //         price += row[key].quantity*row[key].hargaL;
                //         break;
                //     case "Kg":
                //         price += row[key].quantity*row[key].hargaKg;
                //         break;
                //     }

                con.query(`INSERT INTO orders_log (usersId, ordersId, itemsId, ket, quantity, tprice, status_logId) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [row[key].usersId, resi.resi, row[key].itemsId, row[key].ket, row[key].quantity,  row[key].tprice, 2]);
           
            })

        })
        await con.query(`UPDATE orders_log SET status_logId = '${data.status_logId}' WHERE ordersId = '${data.Orders_logId}' AND id = '${data.items_logId}' `, function (err, ro){
            console.log(ro);
        })
        await this.pembayarantotal(con, resi, callback);

	},

	tracker: async function(con, id, callback) {
		await con.query(`SELECT * FROM orders INNER JOIN status_orders ON status_orders.id = orders.Status INNER JOIN users ON users.id = orders.usersId WHERE orders.IdOrders = ?`, [id], callback)
	}
}