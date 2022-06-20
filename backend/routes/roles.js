const express = require('express');
const Role = require('../models/role');
const router = express.Router();

router.post('/administrador/registro-role', (req, res, next) => {
  const role = new Role({
    nombre: req.body.nombre
  });
  role.save().then(createdRole => {
    res.status(201).json({
      message: 'Role registrado exitosamente!',
      roleId: createdRole._id
    });
  });
});

router.get('/administrador/mostrar-role', (req, res, next) => {
  Role.find()
  .then(roles => {
    res.status(200).json({
      message: 'roles fectched exitosamente',
      roles: roles
    });
  });
});

router.delete('/administrador/eliminar-role/:id', (req, res, next) =>{
  Role.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: 'role eliminado exitosamente'
    });
  });
});

router.put('/administrador/actualizar-role/:id', (req, res, next) =>{
  const role = new Role({
    _id: req.body.id,
    nombre: req.body.nombre
  });
  Role.updateOne({_id: req.params.id}, role).then(result => {
    res.status(200).json({message: 'role actualizado correctamente!'});
  });
});

module.exports = router;
