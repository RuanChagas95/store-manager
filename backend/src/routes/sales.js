const route = require('express').Router();
const salesController = require('../controllers/sales');
const { verifySales, saleExists } = require('../middlewares/sales');
const { productsExist } = require('../middlewares/products');

route.get('/:id', salesController.getByidController);
route.get('/', salesController.getAllController);
route.post('/', verifySales, productsExist, salesController.createController);
route.delete('/:id', saleExists, salesController.deleteController);

module.exports = route;