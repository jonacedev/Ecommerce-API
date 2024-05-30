
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

FavoriteSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

FavoriteSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {   // Transform document to return only necessary info
        delete ret._id;
        delete ret.apiKey;
    }
});

module.exports = mongoose.model("Favorite", FavoriteSchema, "favorites");