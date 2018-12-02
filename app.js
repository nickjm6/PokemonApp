const express = require("express");
const mongoose = require("mongoose");
const dataAccess = require("./database/data-access");

const config = require("./config");

mongoose.connect(config.mongoAddress);
let app = express();

app.use("/javascript", express.static(__dirname + "/frontend/javascript"));
app.use("/images", express.static(__dirname + "/frontend/images"));
app.use("/css", express.static(__dirname + "/frontend/css"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css/"));

const htmlDirectory = __dirname + "/frontend/html/"

app.get("/", (req, res) => {
	res.sendFile(htmlDirectory + "index.html")
});

app.get("/pokemon", (req, res) => {
	let pokemon = req.query.name;
	if(!pokemon)
		res.status(400).json({message: "Please enter the name of the pokemon!"});
	else{
		res.json(dataAccess.queryPokemon(pokemon))
	}
})

app.listen(1234, () => {
	console.log("Server started on port 1234");
})