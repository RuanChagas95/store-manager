const model = require('../models/sales');
const service = require('../services/sales');

const getAllController = async (_req, res) => {
  const sales = await model.getAllModel();
  res.status(200).json(sales);
};

const getByidController = async (req, res) => {
  const { id } = req.params;
  const sales = await service.getByIdService(id);
  res.status(sales.status).json(sales.payload);
};

module.exports = { getAllController, getByidController };