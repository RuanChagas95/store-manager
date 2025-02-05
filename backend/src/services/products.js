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

const createProductService = async (product) => {
  const { name } = product;
  const result = await model.createProductModel(name);
  return { status: status.CREATED, payload: result };
};

const updateProductService = async (id, product) => {
  const { name } = product;
  await model.updateProductModel(id, name);
  return { status: status.OK, payload: { id: Number(id), name } };
};

const deleteProductService = async (id) => {
  await model.deleteProductModel(id);
  return { status: status.NO_CONTENT, payload: undefined };
};

const searchProductService = async (q) => {
  const products = await model.searchProductModel(q);
  return { status: status.OK, payload: products };
};

module.exports = { 
  getAllService,
  getByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  searchProductService,
};