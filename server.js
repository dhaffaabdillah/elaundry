const express = require("express");
const dotenv = require("dotenv");
const flash = require("express-flash");
dotenv.config();
const app = express();
const bodyParser = require("body-parser")
const auth = require("./utils/auth");
auth.initialization(app);

// router
const loginRoute = require("./controllers/login.route"),
    profileRoute = require("./controllers/profile.route"),
    serviceRoute = require("./controllers/service.route")


app.listen(process.env.SERVER_PORT, function () {
    console.log("Server udah jalan y: 127.0.0.1" + process.env.SERVER_PORT)
});

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.set("view engine", "ejs");
app.set("views", "views");
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/admin/services", serviceRoute);