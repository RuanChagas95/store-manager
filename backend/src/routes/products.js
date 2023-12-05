const route = require('express').Router();

const { getAllController, getByidController } = require('../controllers/products');

route.get('/:id', getByidController);
route.get('/', getAllController);
module.exports = route;