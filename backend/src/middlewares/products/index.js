const productsModel = require('../../models/products');

const verifyProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const productsExist = async (req, res, next) => {
  const sales = req.body;
  const products = await Promise.all(
    sales.map(({ productId }) => (productsModel.getByIdModel(productId))),
  );
  const notFound = products.some(
    (product) => (!product),
  ) ? 'Product not found' : null;

  return notFound ? res.status(404).json({ message: notFound }) : next();
};

module.exports = { verifyProduct, productsExist };