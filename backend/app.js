const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');
const ventasRoutes = require('./routes/ventas');

const app = express();

mongoose.connect('mongodb://localhost:27017/carrito-de-compras', {useNewUrlParser: true})
.then(() =>{
console.log('conectado a mongoDB!');
}).catch(() => {
console.log('No conectado a mongoDB!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader(
      "Access-Control-Allow-Methods",
       "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use(categoriasRoutes);
app.use(productosRoutes);
app.use(rolesRoutes);
app.use(usuariosRoutes);
app.use(ventasRoutes);

module.exports = app;
