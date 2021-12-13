const { json } = require("express");

function logErrors (err, req, response, next){
  console.log("logErrors")
  console.error(err);
  // al colocar el next(err) estamos indicando que es un middleware de tipo error...
  next(err);
}

//formato para devolverselo al cliente
// Como es un middleware de tipo error debe de prevaleser la
//estructura asi no se vaya a usar el next(err,req,res,next)

function errorHandler(err, req, response,next){
  console.log("errorHandler");
  response.status(500).json({
      message: err.message,
      stack: err.stack,
  });
}

function boomErrorHandler(err, req, response,next){
  if (err.isBoom) {
    const {output} = err;
    response.status(output.statusCode).json(output.payload);
  }
  next(err);
 }

module.exports={logErrors, errorHandler,boomErrorHandler}
