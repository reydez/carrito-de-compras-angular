const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria_id: { type: String, required: true }
});

module.exports = mongoose.model('Producto', productoSchema);
