const pokejson = require("./pokemon-list.js");
const Pokemon = require("./Pokemon.js");

const mongoose = require("mongoose");
mongoose.connect(require("../config").mongoAddress);

const numGenerations = 7;

const genRegions = [[],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1]
]

missingPokemon1 = ["Pichu", "Cleffa", "Igglybuff", "Crobat", "Bellossom", "Politoed", "Slowking", "Magnezone", "Steelix", "Tyrogue", "Hitmontop", "Lickilicky", "Rhyperior", "Happiny", "Blissey", "Tangrowth", "Kingdra", "Mime Jr.", "Scizor", "Smoochum", "Elekid", "Electivire", "Magby", "Magmortar", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Porygon2", "Porygon-Z", "Munchlax"];
missingPokemon2 = ["Magnezone", "Lickilicky", "Rhyperior", "Happiny", "Tangrowth", "Mime Jr.", "Electivire", "Magmortar", "Leafeon", "Glaceon", "Sylveon", "Porygon-Z"];
missingPokemon3 = ["Sylveon"]
const regions = ["", "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola"]
const missingPokemon = [[],
    missingPokemon1,
    missingPokemon2,
    missingPokemon2,
    missingPokemon3,
    missingPokemon3,
    [], 
    []
];

const missingTypes = [
    [],
    ["Dark", "Steel", "Fairy"],
    ["Fairy"],
    ["Fairy"],
    ["Fairy"],
    ["Fairy"],
    [],
    []
]

Pokemon.remove({}, () => {
    console.log("removed all pokemon entries");
})


let addPokemon = (pokemon, generation, introduced=1) => {
    let regionArr = genRegions[generation];
    const newPokemon = new Pokemon({
        name: pokemon.names.en,
        number: pokemon.national_id,
        type1: pokemon.types[0],
        type2: pokemon.types.length > 1 && !missingTypes[generation].includes(pokemon.types[1])? pokemon.types[1] : null,
        generation: generation,
        evolvesInto: [],
        evolvesFrom: {name: pokemon.evolution_from && !missingPokemon[generation].includes(pokemon.evolution_from) ? pokemon.evolution_from : null, regions: []},
        kanto_number: regionArr[1] ? pokemon.kanto_id : null,
        johto_number: regionArr[2] ? pokemon.johto_id : null,
        hoenn_number: regionArr[3] ? pokemon.hoenn_id : null,
        sinnoh_number: regionArr[4] ? pokemon.sinnoh_id : null,
        unova_number: regionArr[5] ? pokemon.unova_id : null,
        kalos_number: regionArr[6] ? pokemon.kalos_id : null,
        alola_id: regionArr[7] ? pokemon.alola_id : null
    })
    for(let j = introduced; j <= generation; j++){
        if(!missingPokemon[j].includes(pokemon.evolution_from))
            newPokemon.evolvesFrom.regions.push(regions[j]);
    }
    for(let j = 0; j < pokemon.evolutions.length; j++){
        let evolution = pokemon.evolutions[j];
        if(missingPokemon[generation].includes(evolution.to))
            continue;
        let newEvolution = {
            name: evolution.to,
            type: "",
            level: 0,
            item: "",
            conditions: [],
            regions: [] 
        };
        for(let j = introduced; j <= generation; j++){
            if(!missingPokemon[j].includes(evolution.to))
                newEvolution.regions.push(regions[j]);
        }
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
            console.log("added pokemon: " + pokemon.names.en)
    });
}

for(let pokename in pokejson){
    let pokemon = pokejson[pokename];
    if(pokemon.kanto_id){
        gen1MissingTypes = ["Dark", "Steel", "Fairy"];
        
       addPokemon(pokemon, 1, 1);
       addPokemon(pokemon, 2, 1)
       addPokemon(pokemon, 3, 1);
       addPokemon(pokemon, 4, 1);
       addPokemon(pokemon, 5, 1);
       addPokemon(pokemon, 6, 1);
       addPokemon(pokemon, 7, 1);
    }
}

