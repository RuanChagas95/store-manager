const model = require('../models/products');
const { status } = require('../utils/httpStatus');

const getAllService = async () => {
  const products = await model.getAllModel();
  return { status: status.OK, payload: products };
};

const getByIdService = async (id) => {
  const product = await model.getByIdModel(id);
  return product ? { status: status.OK, payload: product } 
    : { status: status.NOT_FOUND, payload: { message: 'Product not found' } };
};
module.exports = { getAllService, getByIdService };