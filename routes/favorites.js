const express = require('express');
const router = express.Router();
const FavoritesController = require('../controllers/favoritesController');
const middleware = require("../middleware/apiKey");

// Definir rutas

router.post('/addFavorite/:productId', middleware, FavoritesController.addFavorite);
router.delete('/removeFavorite/:productId', FavoritesController.removeFavorite);
router.get('/getFavorites', middleware, FavoritesController.getFavorites);

// Exportar

module.exports = router;