
const {Schema, model} = require("mongoose");

const ProductSchema = Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

ProductSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

module.exports = model("Product", ProductSchema, "products");