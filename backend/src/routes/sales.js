const route = require('express').Router();
const salesController = require('../controllers/sales');

route.get('/:id', salesController.getByidController);
route.get('/', salesController.getAllController);

module.exports = route;