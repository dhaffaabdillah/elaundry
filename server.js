const express = require("express")
const dotenv = require("dotenv")
const flash = require("express-flash")
var methodOverride = require("method-override")
dotenv.config()
const app = express()
const bodyParser = require("body-parser")
const auth = require("./utils/auth")
const con = require("./utils/db2")
const path = require("path")
auth.initialization(app)

// router
const loginRoute = require("./controllers/login.route")
const profileRoute = require("./controllers/profile.route")
const serviceRoute = require("./controllers/service.route")
const ordersRoute  = require("./routes/ordersRouter")

// use modules
app.use(function(req, res, next) {
    req.con = con
    next()
})
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
app.use(flash())
app.use(methodOverride("_method"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(__dirname + '/public'));
app.use("/login", loginRoute)
app.use("/profile", profileRoute)
app.use("/admin/services", serviceRoute)
app.use("/admin/orders", ordersRoute)

// port server
app.listen(process.env.SERVER_PORT, function () {
    console.log("Server udah jalan y: 127.0.0.1" + process.env.SERVER_PORT)
});

