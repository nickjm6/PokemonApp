let Pokemon = require("./Pokemon");
let mongoose = require("mongoose");

mongoose.connect(require("../config").mongoAddress);

let queryPokemon = (name) => {
    return {
        name:  name,
        type1: "Normal",
        fromDB: true
    }
}

module.exports = {
    queryPokemon: queryPokemon
}