const Favorite = require('../models/favorite');
const Product = require('../models/product');

const addToFavorites = (req, res) => {
    const apiKey = req.user.apiKey;
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            return Favorite.findOneAndUpdate(
                { apiKey: apiKey },
                { $addToSet: { products: productId } }, // $addToSet adds the item to the array only if it does not already exist
                { new: true, upsert: true } // Upsert true will create a new document if it does not exist
            );
        })
        .then(favorite => {
            if (!favorite) {
                return res.status(500).json({ success: false, message: 'Unable to update favorites' });
            }
            if (favorite.products.includes(productId)) {
                return res.status(409).json({ success: false, message: 'Product already in favorites' });
            }
            return res.status(201).json({ success: true, message: 'Product added to favorites' });
        })
        .catch(err => {
            console.error('Error updating favorites:', err);
            return res.status(500).json({ success: false, message: 'Error saving favorites', error: err });
        });
};

const removeFavorite = (req, res) => {
    const apiKey = req.user.apiKey;
    const productId = req.params.productId;

    Favorite.findOne({ apiKey: apiKey })
        .then(favorite => {
            if (!favorite) {
                return res.status(404).json({ success: false, message: 'Favorites not found' });
            }

            // Remove the product from the favorites array
            const index = favorite.products.indexOf(productId);
            if (index > -1) {
                favorite.products.splice(index, 1);  // Remove the product if found
            } else {
                return res.status(404).json({ success: false, message: 'Product not found in favorites' });
            }

            // Save the updated favorites
            favorite.save()
                .then(() => res.status(200).json({ success: true, message: 'Product removed from favorites', favorites: favorite.products }))
                .catch(err => res.status(500).json({ success: false, message: 'Error updating favorites', error: err }));
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Error retrieving favorites', error: err });
        });
};

const getFavorites = (req, res) => {
    const apiKey = req.user.apiKey;

    Favorite.findOne({ apiKey: apiKey })
        .populate('products')
        .then(favorite => {
            if (!favorite) {
                return res.status(404).json({ success: false, message: 'No favorites found' });
            }
            res.status(200).json({ success: true, favorites: favorite.products });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Error retrieving favorites', error: err });
        });
};

module.exports = {
    addToFavorites,
    removeFavorite,
    getFavorites
};