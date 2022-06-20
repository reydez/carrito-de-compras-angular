const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secreto-esto-debe-de-ser-mas-largo');
    next();
  }catch(error){
    res.status(401).json({
      message: 'Usted no esta authenticado!'
    });
  }
}
