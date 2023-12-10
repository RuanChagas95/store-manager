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

const createProductController = async (req, res) => {
  const result = await productsService.createProductService(req.body);
  res.status(result.status).json(result.payload);
};

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.updateProductService(id, req.body);
  res.status(result.status).json(result.payload);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteProductService(id);
  res.status(result.status).json(result.payload);
};

module.exports = { 
  getAllController,
  getByidController,
  createProductController,
  updateProductController,
  deleteProductController,
};