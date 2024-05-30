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

const productRoutes = require('./routes/products');
const favoriteRoutes = require('./routes/favorites');

app.use('/api/products', productRoutes);
app.use('/api/favorites', favoriteRoutes);


//Poner servidor a escuchar peticiones http

app.listen(puerto, () => {
    console.log("Servidor node corriendo en el puerto:", puerto);
});