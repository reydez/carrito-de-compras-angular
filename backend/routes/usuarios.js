const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/usuario/cliente-registrar', (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const usuario = new Usuario({
      nombre: req.body.nombre,
      correo: req.body.correo,
      password: hash,
      role_id: req.body.role_id
    });
    usuario.save()
    .then(result => {
      res.status(201).json({
        message: 'Cliente registrado exitosamente',
        result: result
      });
    }).catch(err => {
      res.status(500).json({message: 'credenciales de autenticación inválidas!'});
    });
  });
});

router.post('/usuario/inicio-sesion', (req, res, next) =>{
  let fetchedUser;
  Usuario.findOne({ correo: req.body.correo })
  .then(usuario => {
    if(!usuario){
      return res.status(401).json({
        message: 'credenciales de autenticación inválidas!'
      });
    }
    fetchedUser = usuario;
    return bcrypt.compare(req.body.password, usuario.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({message: 'credenciales de autenticación inválidas!'});
    }
    const token = jwt.sign(
      {usuarioId: fetchedUser._id, nombre: fetchedUser.nombre, correo: fetchedUser.correo, role: fetchedUser.role_id},
      'secreto-esto-debe-de-ser-mas-largo',
       {expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  }).catch(err => {
    return res.status(401).json({message: 'credenciales de autenticación inválidas!'});
  });
});

router.get('/administrador/mostrar-usuarios', (req, res, next) => {
  Usuario.find()
  .then(usuarios => {
    res.status(200).json({
      message: 'usuarios fectched exitosamente',
      usuarios: usuarios
    });
  });
});

router.delete('/administrador/eliminar-usuario/:id', (req, res, next) =>{
  Usuario.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: 'usuario eliminado exitosamente'
    });
  });
});

router.put('/administrador/actualizar-usuario/:id', (req, res, next) =>{
  const usuario = new Usuario({
    _id: req.body.id,
    nombre: req.body.nombre,
    correo: req.body.correo,
    role_id: req.body.role_id
  });
  Usuario.updateOne({_id: req.params.id}, usuario).then(result => {
    res.status(200).json({message: 'role actualizado correctamente!'});
  });
});

module.exports = router;
