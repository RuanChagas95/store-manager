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

const createController = async (req, res) => {
  const sales = await service.createService(req.body);
  res.status(sales.status).json(sales.payload);
};

const deleteController = async (req, res) => {
  const { id } = req.params;
  const { status, payload } = await service.deleteService(id);
  res.status(status).json(payload);
};

module.exports = { 
  getAllController,
  getByidController,
  createController,
  deleteController,
};