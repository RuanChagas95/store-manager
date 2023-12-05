const connection = require('../db/connection');

const getAllModel = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getByIdModel = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM products WHERE id=?',
    [id],
  );
  return products[0];
};
module.exports = { getAllModel, getByIdModel };