const pokejson = require("./pokemon-list.js");
const Pokemon = require("./Pokemon.js");

const mongoose = require("mongoose");
mongoose.connect(require("../config").mongoAddress);

const numGenerations = 7;

Pokemon.remove({}, () => {
    console.log("removed all pokemon entries");
});

for(let pokename in pokejson){
    let pokemon = pokejson[pokename];
    if(pokemon.kanto_id){
        missingTypes = ["Dark", "Steel", "Fairy"];
        missingPokemon = ["Pichu", "Cleffa", "Igglybuff", "Crobat", "Bellossom", "Politoed", "Slowking", "Magnezone", "Steelix", "Tyrogue", "Hitmontop", "Lickilicky", "Rhyperior", "Happiny", "Blissey", "Tangrowth", "Kingdra", "Mime Jr.", "Scizor", "Smoochum", "Elekid", "Electivire", "Magby", "Magmortar", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Porygon2", "Porygon-Z", "Munchlax"]
        const newPokemon = new Pokemon({
            name: pokemon.names.en,
            number: pokemon.national_id,
            type1: pokemon.types[0],
            type2: pokemon.types.length > 1 && !missingTypes.includes(pokemon.types[1])? pokemon.types[1] : null,
            generation: 1,
            evolvesInto: [],
            evolvesFrom: pokemon.evolution_from && !missingPokemon.includes(pokemon.evolution_from) ? pokemon.evolution_from : null,
            kanto_number: pokemon.kanto_id,
            johto_number: null,
            hoenn_number: null,
            sinnoh_number: null,
            unova_number: null,
            kalos_number: null,
            alola_id: null
        })
        for(let j = 0; j < pokemon.evolutions.length; j++){
            let evolution = pokemon.evolutions[j];
            if(missingPokemon.includes(evolution.to))
            continue;
            let newEvolution = {
                name: evolution.to,
                number: 0,
                type: "",
                level: 0,
                item: "",
                conditions: [],
                regions: ["Kanto"] 
            };

            if(evolution.level){
                newEvolution.type = "level";
                newEvolution.level = evolution.level
            } else if(evolution.item){
                newEvolution.type = "item";
                newEvolution.item = evolution.item;
            } else if(evolution.level_up){
                newEvolution.type = "level_up";
                newEvolution.conditions = evolution.move_learned ? ["Move learned: " + evolution.move_learned] : evolution.conditions;
            } else if(evolution.happiness){
                newEvolution.type = "happiness"
            } else if(evolution.trade){
                newEvolution.type = "trade"
                newEvolution.item = evolution.hold_item ? evolution.hold_item: null;
            }
            newPokemon.evolvesInto.push(newEvolution);
        }
        newPokemon.save((err) => {
            if(err)
                console.log("error occured saving object: " + err);
            else
                console.log("added pokemon: " + pokename)
        });
    }
}

