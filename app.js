const express = require("express");
const mongoose = require("mongoose");
const dataAccess = require("./database/data-access");
const fs = require("fs");
const https = require("https");
const http = require("http");


let config;
try{
    config = require("./config")
} catch (e) {
    throw new Error("Make sure you have a file named config.js in the root folder. Please use config-template.js as a template!")
}

let credentials;
try{
	let key = fs.readFileSync("./server.key", "utf8");
	let cert = fs.readFileSync("./server.cert", "utf8");
	credentials = {key: key, cert: cert}
} catch (e) {
	throw new Error("Make sure you have server.cert and server.key in your root directory. Run 'npm run generate-key' if you do not!");
}

const sPortNumber = 1234;
const portNumber = 9876;


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
	let generation = req.query.generation || config.currentGen;
	if(!pokemon || pokemon.length < 1)
		res.status(400).json({message: "Please enter the name of the pokemon!"});
	else{
		dataAccess.queryPokemon(pokemon, generation, (err, result) => {
			if(err)
				res.status(500).json({message: "Internal Server Error: " + err.message})
			else
				res.json(result);
		})
	}
})

https.createServer(credentials, app).listen(sPortNumber, () => {
	console.log("https server started on port: " + portNumber);
});

http.createServer(app).listen(portNumber, () => {
	console.log("http server started on port: " + portNumber)
})