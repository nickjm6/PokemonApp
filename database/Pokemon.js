var mongoose = require("mongoose")

var pokeSchema = mongoose.Schema({
    name: String,
    number: Number,
    type1: String,
    type2: String,
    generation: Number,
    evolves: Boolean,
    evolvesInto: String,
    evolvesIntoID: String,
    evolveType: String,
    evolveLevel: Number,
    evolveStone: String,
    image: Buffer
});

module.exports = mongoose.model("Pokemon", pokeSchema);