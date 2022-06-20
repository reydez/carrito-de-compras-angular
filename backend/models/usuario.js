const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  role_id: { type: String, required: true }
});

usuarioSchema.plugin(uniqueValidator, {message: 'Correo debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);


