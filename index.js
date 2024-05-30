const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');


//Conexion a bbdd

connection();

//Crear servidor node

const app = express();
const puerto = 3900;

//Configurar cors

app.use(cors());

//Convertir datos del body a js

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar conf rutas

const productsRoutes = require('./routes/products');
const favoritesRoutes = require('./routes/favorites');
const usersRoutes = require('./routes/users');

app.use('/api/products', productsRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/users', usersRoutes);


//Poner servidor a escuchar peticiones http

app.listen(puerto, () => {
    console.log("Servidor node corriendo en el puerto:", puerto);
});