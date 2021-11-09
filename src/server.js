var express = require("express");
var app = express();
const router = require("./routes")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(router)

var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Rodando");
});

app.use(function (req, res) {
    res.status(404);
});