const mongoose = require('mongoose');

const ventaSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  carrito: { type: String, required: true },
  numero_tarjeta: { type: String, required: true },
  pago_total: { type: Number, required: true },
  fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Venta', ventaSchema);

