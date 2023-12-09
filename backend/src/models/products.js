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

const updateProductModel = async (id, name) => {
  const [result] = await connection.execute(
    'UPDATE products SET name=? WHERE id=?',
    [name, id],
  );
  return result;
};

module.exports = { getAllModel, getByIdModel, createProductModel, updateProductModel };