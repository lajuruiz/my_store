// estan todas las rutas que tengan que ver con los productos
const { response } = require("express");
const express =require("express");

const ProductService = require("./../services/product.service");
const validatorHandler = require("./../middlewares/validator.handler");
const {reateProductSchema, updateProductSchema,getProductSchema, createProductSchema } = require("./../schema/product.schema");


const router= express.Router();
const service= new ProductService();

router.get("/", async (req, response) => {
  //obtenemos la respuesta de los productos de forma asincrona
  const products = await service.find();
  response.json(products);
});

router.get("/filter", (req ,response) => {
  response.send("yo soy un filter")
});

router.get("/:id" ,
  validatorHandler(getProductSchema, "params"),
  async (req, response,next) => {
    try {
    const {id} = req.params;
    const product =await service.findOne(id);
    response.json(product);
  } catch (error) {
    next(error);
  }
});

// desestructuracion en el id {id}
/* router.get("/:id" , (req, response) => {
  const {id} = req.params;
  response.json({
    id,
    name: "product 2",
    price: 1200
  });
}); */

//error 404
/* router.get("/:id" , (req, response) => {
  const {id} = req.params;
  if (id === "999") {
    response.status(404).json({
      message: " not found"
  });
} else {
  response.status(200).json({
    id,
    name: "product 2",
    price: 1200
    });
  }
});
 */

router.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, response) => {
    const body = req.body;
    const newProduct= await service.create(body);
    response.status(201).json(newProduct);
});

router.patch("/:id", async(req, response) => {
  try {
    const {id} =req.params;
    const body = req.body;
    const product= await service.update(id,body);
    response.json(product);
  } catch (error) {
    response.status(404).json({
      message: error.message
    })
  }
})

router.delete("/:id", async (req, response) => {
  const {id} =req.params;
  const respuesta= await service.delete(id);
  response.json(respuesta);
  });

module.exports=router;
