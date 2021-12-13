const express = require("express");

const  router= express.Router();

router.get("/", (req, response) => {
  const {limit , offset} = req.query;
  if(limit && offset){
    response.json({
      limit,
      offset
    });
  } else {
    response.send(" no hay parametros");
  }
});

module.exports= router;
