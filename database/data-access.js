const Pokemon = require("./Pokemon");
const mongoose = require("mongoose");
let config
try{
    config = require("../config")
} catch (e){
    throw new Error("Make sure you have a file named config.js in the root folder. Please use config-template.js as a template!")
}

const currentGen = config.currentGen;

mongoose.connect(config.mongoAddress);

let queryPokemon = (name, generation, done) => {
    let pokename = name[0].toUpperCase() + name.slice(1);
    let pokegen = generation && generation > 0 && generation <= currentGen ? generation : currentGen;
    Pokemon.findOne({name: pokename, generation: pokegen}, (err, pokemon) => {
        if(err)
            return done(err);
        if(pokemon)
            return done(null, pokemon)
        return done(new Error("Pokemon not found!"))
    });
}

module.exports = {
    queryPokemon: queryPokemon
}