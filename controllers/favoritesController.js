const Favorite = require('../models/favorite');
const Product = require('../models/product');

const addFavorite = (req, res) => {
    const apiKey = req.user.apiKey;
    const productId = req.params.productId;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            // Attempt to add the product to the favorites list
            return Favorite.findOneAndUpdate(
                { apiKey: apiKey },
                { $addToSet: { products: productId } }, // $addToSet prevents duplicates
                { new: true, upsert: true } // Create a new document if one doesn't exist
            );
        })
        .then(favorite => {
            if (!favorite) {
                return res.status(500).json({ success: false, message: 'Unable to update favorites' });
            }

            if (favorite.products.includes(productId)) {
                return res.status(201).json({ success: true, message: 'Product successfully added to favorites' });
            } else {
                return res.status(409).json({ success: false, message: 'Product already in favorites' });
            }
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
                return res.status(404).json({ success: false, message: 'Favorite not found' });
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
            return res.status(500).json({ success: false, message: 'Error retrieving favorites', error: err });
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
            return res.status(200).json({ success: true, favorites: favorite.products });
        })
        .catch(err => {
            return res.status(500).json({ success: false, message: 'Error retrieving favorites', error: err });
        });
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
};