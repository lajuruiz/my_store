
const express =require("express");
const routerApi = require("./routes");
const faker = require("faker")

//middleware
const{ logErrors, errorHandler,boomErrorHandler } =require("./middlewares/error.handler")

const app = express();
const port= 3001;

//express.json()
//es un método incorporado en express para reconocer el objeto de solicitud entrante como objeto JSON.
//Este método se llama como middleware en su aplicación usando el código:
//app.use(express.json());

app.use(express.json());

app.get("/", (req, response) => {
  response.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req, response) => {
  response.send("Hola soy una nueva ruta");
});

routerApi(app);

//middleware
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("mi port " + port);
});

//query parameters
/* app.get("/products", (req, response) => {
  //crear array de productos
  const products = [];
  const {size} = req.query;
  const limit= size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price : parseInt(faker.commerce.price()),
      image:faker.image.imageUrl()
    });
  }
  response.json(products);
});

app.get("/products/filter", (req ,response) => {
  response.send("yo soy un filter")
})

// desestructuracion en el id {id}
app.get("/products/:id" , (req, response) => {
  const {id} = req.params;
  response.json({
    id,
    name: "product 2",
    price: 1200
  });
});

app.get("/users", (req, response) => {
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
// respuesta de esta seria asi:
/* {
  "limit": "10",
  "offset": "200"
}
 */

/* app.get("/categories/:categoryId/products/:productId", (req, response) => {
  const {categoryId, productId} = req.params;
  response.json({
    categoryId,
    productId,
  });
})

app.get("/users", (req, response) => {
  response.json([
    {
      id:1,
      name: "user",
      password: 12345678,
      email : "user@gmail.com"
  },
  {
      id:2,
      name: "user 2",
      password: 1232225678,
      email : "user2@gmail.com"

    }
  ]);
});

app.get("/users/:id" , (req, response) => {
  const {id}= req.params;
  response.json({
    id,
    name: 'user ' + id,
    email: 'user' + id + '@mail.com',
    password: 12345678
  });
}); */

//ordenes (no lo he  hecho aun )
// app.get('/users/:id/orders', (req, res) => {
 /*  const { id } = req.params;
  res.json([
    {
      userId: id,
      orderName: 'Order 1'
    },
    {
      userId: id,
      orderName: 'Order 2'
    }
  ]);
});
app.get('/users/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params;
  res.json({
    userId,
    orderId
  });
}); */


