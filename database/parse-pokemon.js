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
];

const effectiveness = {
    Normal: {
        weak: ["Fighting"],
        resistant: [],
        unaffected: ["Ghost"]
    },
    Fire: {
        weak: ["Water", "Ground", "Rock"],
        resistant: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
        unaffected: []
    },
    Water: {
        weak: ["Electric", "Grass"],
        resistant: ["Fire", "Water", "Ice", "Steel"],
        unaffected: []
    },
    Electric: {
        weak: ["Ground"],
        resistant: ["Electric", "Flying", "Steel"],
        unaffected: []
    },
    Grass: {
        weak: ["Fire", "Ice", "Poison", "Flying", "Bug"],
        resistant: ["Water", "Electric", "Grass", "Ground"],
        unaffected: []
    },
    Ice: {
        weak: ["Fire", "Fighting", "Rock", "Steel"],
        resistant: ["Ice"],
        unaffected: []
    },
    Fighting: {
        weak: ["Flying", "Psychic", "Fairy"],
        resistant: ["Bug", "Rock", "Dark"],
        unaffected: []
    },
    Poison: {
        weak: ["Ground", "Psychic"],
        resistant: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
        unaffected: []
    },
    Ground: {
        weak: ["Water", "Grass", "Ice"],
        resistant: ["Poison", "Rock"],
        unaffected: ["Electric"]
    },
    Flying: {
        weak: ["Electric", "Ice", "Rock"],
        resistant: ["Grass", "Fighting", "Bug"],
        unaffected: ["Ground"]
    },
    Psychic: {
        weak: ["Bug", "Ghost", "Dark"],
        resistant: ["Fighting", "Psychic"],
        unaffected: []
    },
    Bug: {
        weak: ["Fire", "Flying", "Rock"],
        resistant: ["Grass", "Fighting", "Ground"],
        unaffected: []
    },
    Rock: {
        weak: ["Water", "Grass", "Fighting", "Ground", "Steel"],
        resistant: ["Normal", "Fire", "Poison", "Flying"],
        unaffected: []
    },
    Ghost: {
        weak: ["Ghost", "Dark"],
        resistant: ["Poison", "Bug"],
        unaffected: ["Normal", "Fighting"]
    },
    Dragon: {
        weak: ["Ice", "Dragon", "Fairy"],
        resistant: ["Fire", "Water", "Electric", "Grass"],
        unaffected: []
    },
    Dark: {
        weak: ["Fighting", "Bug", "Fairy"],
        resistant: ["Ghost", "Dark"],
        unaffected: ["Psychic"]
    },
    Steel: {
        weak: ["Fire", "Fighting", "Ground"],
        resistant: ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"],
        unaffected: ["Poison"]
    },
    Fairy: {
        weak: ["Poison", "Steel"],
        resistant: ["Fighting", "Bug", "Dark"],
        unaffected: ["Dragon"]
    }
}

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
        weaknesses: [],
        superweaknesses: [],
        resistances: [],
        superresistances: [],
        unaffected: [],
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
    });
    if(newPokemon.type2){
        let eff1 = effectiveness[newPokemon.type1];
        let eff2 = effectiveness[newPokemon.type2];
        let seenTypes = []
        for(let i = 0; i < eff1.weak.length; i++){
            let weakness = eff1.weak[i];
            seenTypes.push(weakness);
            if(missingTypes[generation].includes(weakness))
                continue
            if(eff2.weak.includes(weakness))
                newPokemon.superweaknesses.push(weakness);
            else if(eff2.unaffected.includes(weakness))
                newPokemon.unaffected.push(weakness);
            else if(!eff2.resistant.includes(weakness))
                newPokemon.weaknesses.push(weakness);;
        }
        for(let i = 0; i < eff1.unaffected.length; i++){
            let unaffected = eff1.unaffected[i];
            seenTypes.push(unaffected);
            if(missingTypes[generation].includes(unaffected))
                continue
            newPokemon.unaffected.push(unaffected);
        }
        for(let i = 0; i < eff1.resistant.length; i++){
            let resistance = eff1.resistant[i];
            seenTypes.push(resistance);
            if(missingTypes[generation].includes(resistance))
                continue
            if(eff2.unaffected.includes(resistance))
                newPokemon.unaffected.push(resistance);
            else if(eff2.resistant.includes(resistance))
                newPokemon.superresistances.push(resistance);
            else if(!eff2.weak.includes(resistance))
                newPokemon.resistances.push(resistance);
            
        }
        for(let i = 0; i < eff2.weak.length; i++)
            if(!seenTypes.includes(eff2.weak[i]) && !missingPokemon[generation].includes(eff.weak[i]))
                newPokemon.weaknesses.push(eff2.weak[i])
        for(let i = 0; i < eff2.unaffected.length; i++)
            if(!seenTypes.includes(eff2.unaffected[i]) && !missingPokemon[generation].includes(eff.unaffected[i]))
                newPokemon.unaffected.push(eff2.unaffected[i])
        for(let i = 0; i < eff2.resistant.length; i++)
            if(!seenTypes.includes(eff2.resistant[i]) && !missingPokemon[generation].includes(eff.resistant[i]))
                newPokemon.resistances.push(eff2.resistant[i])
    } else {
        eff = effectiveness[newPokemon.type1];
        newPokemon.weaknesses = eff.weak.filter((x) => !missingTypes[generation].includes(x));
        newPokemon.unaffected = eff.unaffected.filter((x) => !missingTypes[generation].includes(x));
        newPokemon.resistances = eff.resistant.filter((x) => !missingTypes[generation].includes(x));
    }

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

