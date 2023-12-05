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

module.exports = { getAllService, getByIdService };