const model = require('../models/sales');

const getAllService = async () => {
  const sales = await model.getAllModel();
  return { status: 200, payload: sales };
};
const getByIdService = async (id) => {
  const sales = await model.getByIdModel(id);
  if (!sales.length) return { status: 404, payload: { message: 'Sale not found' } };
  return { status: 200, payload: sales };
};

const createService = async (sales) => {
  const id = await model.createSaleModel();
  await Promise.all(sales.map((sale) => model.addProductModel(sale, id)));
  return { status: 201, payload: { id, itemsSold: sales } };
};

module.exports = { getAllService, getByIdService, createService };