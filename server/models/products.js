const { pool } = require("./pool");

function getAllProducts(req, res, next) {
  const queryString = "SELECT * FROM produk";
  pool.query(queryString, (err, data) => {
    if (err) {
      req.err = err;
      next();
    }
    req.data = data.rows;
    next();
  });
}

function getAdminProducts() {
  const queryString = "SELECT id_produk, nama_produk FROM produk";
  pool.query(queryString, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return [{ success: true }, ...data.rows];
  });
}

module.exports = { getAllProducts, getAdminProducts };
