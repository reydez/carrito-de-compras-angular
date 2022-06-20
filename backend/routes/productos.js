const express = require('express');
const multer = require('multer');
const Producto = require('../models/producto');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('mime type invalido');
    if(isValid){error=null;}
    cb(error, "backend/images");
  },
  filename: (req, file, cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('/administrador/registro-producto',
multer({storage: storage}).single('imagen'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const producto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    imagen: url + '/images/' + req.file.filename,
    categoria_id: req.body.categoria_id
  });
  producto.save().then(createdProducto => {
    res.status(201).json({
      message: 'Producto agregado exitosamente!',
      producto: {
        id: createdProducto._id,
        nombre: createdProducto.nombre,
        precio: createdProducto.precio,
        cantidad: createdProducto.cantidad,
        imagen: createdProducto.imagen,
        categoria_id: createdProducto.categoria_id
      }
    });
  });
});

router.get('/administrador/mostrar-producto', (req, res, next) =>{
  Producto.find()
  .then(productos => {
    res.status(200).json({
      message: 'productos fectched exitosamente',
      productos: productos
    });
  });
});

router.get('/usuario/mostrar-producto-categoria/:id', (req, res, next) =>{
  const id = req.params.id;
  Producto.find({categoria_id: id})
  .then(productos => {
    res.status(200).json({
      message: 'productos fectched exitosamente',
      productos: productos
    });
  });
});

router.delete('/administrador/eliminar-producto/:id', (req, res, next) =>{
  Producto.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'producto eliminado exitosamente'
    });
  });
});

router.put('/administrador/actualizar-producto/:id',
  multer({storage: storage}).single('imagen'),
  (req, res, next) =>{
    let imagen = req.body.imagen;
    if(req.file){
      const url = req.protocol + '://' + req.get('host');
      imagen = url + '/images/' + req.file.filename;
    }
  const producto = new Producto({
    _id: req.body.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
    imagen: imagen,
    categoria_id: req.body.categoria_id
  });
  Producto.updateOne({_id: req.params.id}, producto).then(result => {
    res.status(200).json({message: 'producto actualizado correctamente!'});
  });
});


module.exports = router;
