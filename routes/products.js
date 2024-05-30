const express = require("express");
const router = express.Router();
const ProductsController = require("../controllers/productsController");
const middleware = require("../middleware/apiKey");

// Definir rutas

router.get("/getList", middleware, ProductsController.getList);
router.post("/addProduct", middleware, ProductsController.addProduct);

// Exportar

module.exports = router;