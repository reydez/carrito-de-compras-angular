const express = require("express");
const Venta = require("../models/venta");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/usuario/checkout", (req, res, next) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  const venta = new Venta({
    user_id: req.body.user_id,
    carrito: req.body.carrito,
    numero_tarjeta: req.body.numero_tarjeta,
    pago_total: req.body.pago_total,
    fecha: today,
  });

  venta
    .save()
    .then((createdVenta) => {
      res.status(201).json({
        message: "Venta agregada exitosamente!",
        ventaId: createdVenta._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "la creacion de venta fallo!",
      });
    });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ffbe121384@gmail.com",
      pass: "rodrigo321",
    },
  });

  console.log(transporter);

  let mailOptions = {
    from: "ffbe121384@gmail.com",
    to: req.body.correo,
    subject: "Compra realizada",
    text: "Gracias por su compra",
    html: `<h1>Hola ${req.body.nombre}</h1><br>
      <h4>Gracias por su compra, su total fue ${req.body.pago_total}</h4>`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Paso un Error", err);
    } else {
      console.log("Correo enviado");
    }
  });
});

router.get("/usuario/perfil/:id", (req, res, next) => {
  const id = req.params.id;
  Venta.find({ user_id: id }).then((ventas) => {
    res.status(200).json({
      message: "venta fectched exitosamente",
      ventas: ventas,
    });
  });
});

module.exports = router;
