const snakeize = require('snakeize');
const connection = require('./db/connection');

const modelGetAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id as saleId,
    date,
    product_id as productId,
    quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    ORDER BY productId ASC`,
  );
  return result;
};

const modelGetId = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    date,
    product_id as productId,
    quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    WHERE sale_id = ?
    ORDER BY productId ASC`,
    [id],
  );
  return result;
};

const modelAddSalesProducts = async (saleProducts) => {
  const columns = Object.keys(snakeize(saleProducts)).map((key) => `${key}`).join(',');
  const placeHolders = Object.keys(saleProducts).map((_key) => '?').join(', ');
  const result = await connection.execute(
    `INSERT INTO sales_products (${columns}) VALUES( ${placeHolders})`,
    [...Object.values(saleProducts)],
  );
  return result;
};

const modelAddSales = async (object) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [object.date],
    );
  return insertId;
};

const modelDeleteSalesProducts = async (id) => {
  const result = await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE (?) = StoreManager.sales_products.sale_id`,
    [id],
  );
  return result;
};

const modelDeleteSales = async (id) => {
  const result = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE (?) = StoreManager.sales.id`,
    [id],
  );
  return result;
};

module.exports = {
  modelGetAll,
  modelGetId,
  modelAddSalesProducts,
  modelAddSales,
  modelDeleteSalesProducts,
  modelDeleteSales,
};