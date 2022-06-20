const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);
