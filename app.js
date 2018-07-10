var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var config = require("./config");

mongoose.connect(config.mongoAddress);
var app = express();

app.use("/javascript", express.static(__dirname + "/frontend/javascript"));
app.use("/images", express.static(__dirname + "/frontend/images"));
app.use("/css", express.static(__dirname + "/frontend/css"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css/"));
app.use(bodyParser.urlencoded({extended: false}))

var htmlDirectory = __dirname + "/frontend/html/"

app.get("/", function(req, res){
	res.sendFile(htmlDirectory + "index.html")
});

app.listen(80, function(){
	console.log("Server started on port 80");
})