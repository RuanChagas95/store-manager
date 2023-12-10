const route = require('express').Router();
const { validateName, productsExist } = require('../middlewares/products');

const { getAllController, getByidController, updateProductController,
  createProductController, deleteProductController,
  searchProductController } = require('../controllers/products');

route.get('/search', searchProductController);
route.get('/:id', getByidController);
route.get('/', getAllController);
route.post('/', validateName, createProductController);
route.put('/:id', validateName, productsExist, updateProductController);
route.delete('/:id', productsExist, deleteProductController);

module.exports = route;