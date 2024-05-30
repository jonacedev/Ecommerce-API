const Favorite = require('../models/favorite');
const Product = require('../models/product');

const addToFavorites = (req, res) => {
    const { productId } = req.params;
    const apiKey = req.user.apiKey;  // Assuming the API key is stored in req.user.apiKey

    // Check if the product exists
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            // Check if the favorite document for this API key already exists
            Favorite.findOne({ apiKey: apiKey })
                .then(favorite => {
                    if (!favorite) {
                        // If not, create a new favorite document
                        favorite = new Favorite({ apiKey: apiKey, products: [productId] });
                    } else {
                        // If yes, just add the product to the products array
                        if (!favorite.products.includes(productId)) {
                            favorite.products.push(productId);
                        }
                    }
                    favorite.save()
                        .then(() => res.status(201).json({ success: true, message: 'Product added to favorites' }))
                        .catch(err => res.status(500).json({ success: false, message: 'Error saving favorites', error: err }));
                })
                .catch(err => res.status(500).json({ success: false, message: 'Error finding favorites', error: err }));
        })
        .catch(err => res.status(500).json({ success: false, message: 'Error finding product', error: err }));
};

const getFavorites = (req, res) => {
    const apiKey = req.user.apiKey;

    Favorite.findOne({ apiKey: apiKey })
        .populate('products')  // Ensure you populate to get detailed product info
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
    getFavorites
};