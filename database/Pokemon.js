var mongoose = require("mongoose")

var evolutionSchema = mongoose.Schema({
    name: String,
    type: String,
    level: Number,
    item: String,
    conditions: [String],
    regions: [String]
})

var fromEvolutionSchema = mongoose.Schema({
    name: String,
    regions: [String]
})

var pokeSchema = mongoose.Schema({
    name: String,
    number: Number,
    type1: String,
    type2: String,
    weaknesses: [String],
    superweaknesses: [String],
    resistances: [String],
    superresistances: [String],
    unaffected: [String],
    generation: Number,
    evolvesInto: [evolutionSchema],
    evolvesFrom: fromEvolutionSchema,
    image: Buffer,
    kanto_number: Number,
    johto_number: Number,
    hoenn_number: Number,
    sinnoh_number: Number,
    unova_number: Number,
    kalos_number: Number,
    alola_number: Number
});
module.exports = mongoose.model("Pokemon", pokeSchema);