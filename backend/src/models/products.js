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

const createProductModel = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: result.insertId, name };
};

module.exports = { getAllModel, getByIdModel, createProductModel };