const express = require("express");
const  router= express.Router();

router.get("/categories/:categoryId/products/:productId", (req, response) => {
  const {categoryId, productId} = req.params;
  response.json({
    categoryId,
    productId,
  });
})
module.exports= router;
