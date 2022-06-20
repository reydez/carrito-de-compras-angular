const express = require('express');
const Categoria = require('../models/categoria');
const router = express.Router();

router.post('/administrador/registro-categoria', (req, res, next) => {
  const categoria = new Categoria({
    nombre: req.body.nombre
  });
  categoria.save().then(createdCategoria => {
    res.status(201).json({
      message: 'Categoria agregada exitosamente!',
      categoriaId: createdCategoria._id
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'la creacion de categoria fallo!'
    });
  });
});

router.get('/administrador/mostrar-categoria', (req, res, next) => {
  Categoria.find()
  .then(categorias => {
    res.status(200).json({
      message: 'categorias fectched exitosamente',
      categorias: categorias
    });
  });
});

router.delete('/administrador/eliminar-categoria/:id', (req, res, next) =>{
  Categoria.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'categoria eliminada exitosamente'
    });
  });
});

router.put('/administrador/actualizar-categoria/:id', (req, res, next) =>{
  const categoria = new Categoria({
    _id: req.body.id,
    nombre: req.body.nombre
  });
  Categoria.updateOne({_id: req.params.id}, categoria).then(result => {
    res.status(200).json({message: 'categoria actualizada correctamente!'});
  });
});
module.exports = router;
