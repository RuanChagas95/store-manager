const route = require('express').Router();
const salesController = require('../controllers/sales');
const { verifySales } = require('../middlewares/sales');
const { productsExist } = require('../middlewares/products');

route.get('/:id', salesController.getByidController);
route.get('/', salesController.getAllController);
route.post('/', verifySales, productsExist, salesController.createController);

module.exports = route;