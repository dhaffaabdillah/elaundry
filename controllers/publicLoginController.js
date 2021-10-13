publicAuth = require('../models/publicAuthModels');

module.exports = {
    
    daftarbaru: async function(req, res){

        console.log(req.body);
        // console.log(req.con);


        const notelp = req.body.notelp;

        publicAuth.check(req.con, notelp, function(err, rows) {
            if(!!rows){
                publicAuth.regist(req.con, req.body, function(err, rows) {
                    console.log(err);
                    // console.log(rows)
                    res.redirect('/login');
                })
            }
		})
        
		// res.render("./public/daftarbaru")
	},

    loginakun: async function(req, res){

        
        // publicAuth.check(req.con, '087884116725', function(err, rows) {
        //     console.log(rows);
		// })

        console.log(req.body);
        let type;

        const credentials = req.body.credentials.toString();
        console.log(credentials);
        if(credentials.includes('@')){
            type = 2;
        }else{
            type = 1;
        }

        publicAuth.checklogin(req.con, type, req.body, function(err, rows) {
            
            console.log(rows);

            if(rows.length>0 || rows == undefined){
                // res.redirect('/');
                req.session.isLoggedIn = true;
                req.session.user = rows[0].ID;
                req.session.userrole = rows[0].ROLE;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }else{
                // req.flash('error', 'Invalid email or password.');
                res.redirect('/login');
            }
		})
        
		// res.render("./public/daftarbaru")
	},

    logout: async function(req, res){
        req.session.destroy(err => {
            console.log(err);
            res.redirect('/');
          });
    }

}