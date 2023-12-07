const camelize = require('camelize');
const connection = require('../db/connection');

const getAllModel = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id',
  );
  return camelize(result.map((sale) => {
    const curr = { ...sale };
    delete curr.id;
    return curr;
  }));
};

const getByIdModel = async (id) => {
  const [result] = await connection.execute(
    `SELECT * FROM sales_products INNER JOIN sales ON sales_products.sale_id = sales.id 
        WHERE sales_products.sale_id = ?`,    
    [id],
  );
  return camelize(result.map((sale) => {
    const curr = { ...sale };
    delete curr.id;
    delete curr.sale_id;
    return curr;
  }));
};

const createSaleModel = async () => {
  const [result1] = (await connection.execute('INSERT INTO sales (id) VALUES (DEFAULT)'));
  return result1.insertId;
};

const addProductModel = async (sale, id) => {
  const { productId, quantity } = sale;
  return connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
};
module.exports = { getAllModel, getByIdModel, createSaleModel, addProductModel };
