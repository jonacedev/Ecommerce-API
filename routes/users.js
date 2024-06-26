const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/usersController");
const middleware = require("../middleware/apiKey");

// Definir rutas

router.get("/getDefaultUser", middleware, UsersController.getDefaultUser);

// Exportar

module.exports = router;