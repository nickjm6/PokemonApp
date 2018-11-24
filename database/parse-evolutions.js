const pokejson = require("./pokemon-list.js");
const Pokemon = require("./Pokemon.js");

const mongoose = require("mongoose");
mongoose.connect(require("../config").mongoAddress);

Pokemon.find({}, (err, pokemonList) => {
    for(let i = 0; i < pokemonList.length; i++){
        let pokemon = pokemonList[i];
        let gen = pokemon.generation;
        let evolutions = pokemon.evolvesInto;
        for(let j = 0; j < evolutions.length; j++){
            let evolution = evolutions[j];
            Pokemon.findOne({name: evolution.name, generation: gen}, (err, evolvedForm) => {
                evolution.number = evolvedForm.number
                pokemon.save(err => {
                    if(err)
                        console.log("error saving");
                    else
                        console.log("saved evolution: " + pokemon.name + " > " + evolvedForm.name);
                })
            })
        }
    }
})