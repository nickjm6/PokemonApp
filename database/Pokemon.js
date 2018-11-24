var mongoose = require("mongoose")

var evolutionSchema = mongoose.Schema({
    name: String,
    number: Number,
    type: String,
    level: Number,
    item: String,
    conditions: [String],
    regions: [String]
})

var pokeSchema = mongoose.Schema({
    name: String,
    number: Number,
    type1: String,
    type2: String,
    generation: Number,
    evolvesInto: [evolutionSchema],
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