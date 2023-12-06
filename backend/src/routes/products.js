const route = require('express').Router();

const { getAllController, getByidController,
  createProductController } = require('../controllers/products');

route.get('/:id', getByidController);
route.get('/', getAllController);
route.post('/', createProductController);

module.exports = route;