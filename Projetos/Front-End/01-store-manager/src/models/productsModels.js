const connection = require('./db/connection');

const modelGetAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const modelGetId = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id= ? LIMIT 1',
    [id],
    );
    return result;
};

const modelCreateId = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [newProduct.name],
  );
  return insertId;
};

const modelUpdateProduct = async (updateProduct) => {
  const [insert] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = (?)
    WHERE id = (?)`,
    [updateProduct.name, updateProduct.id],
  );
  return insert;
};

const modelDeleteById = async (id) => {
  const [result] = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE ? = StoreManager.products.id`,
    [id],
  );
  return result;
};

module.exports = {
  modelGetAll,
  modelGetId,
  modelCreateId,
  modelUpdateProduct,
  modelDeleteById,
};