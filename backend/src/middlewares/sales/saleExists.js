const { getByIdModel } = require('../../models/sales');

const saleExists = async (req, res, next) => {
  const { id } = req.params;
  const [sale] = await getByIdModel(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = saleExists;