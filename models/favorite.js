
const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
    apiKey: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model("Favorite", FavoriteSchema, "favorites");