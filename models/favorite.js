
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
    transform: function (doc, ret) {
        ret.id = ret._id.toHexString();
        delete ret._id;  // Delete the original '_id'
    }
});

module.exports = mongoose.model("Favorite", FavoriteSchema, "favorites");