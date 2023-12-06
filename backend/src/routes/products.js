const route = require('express').Router();
const { verifyProduct } = require('../middlewares/products');

const { getAllController, getByidController,
  createProductController } = require('../controllers/products');

route.get('/:id', getByidController);
route.get('/', getAllController);
route.post('/', verifyProduct, createProductController);

module.exports = route;