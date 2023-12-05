const productsService = require('../services/products');

const getAllController = async (_req, res) => {
  const getAll = await productsService.getAllService();
    
  res.status(getAll.status).json(getAll.payload);
};

const getByidController = async (req, res) => {
  const { id } = req.params;
  const getById = await productsService.getByIdService(id);
    
  res.status(getById.status).json(getById.payload);
};
module.exports = { getAllController, getByidController };