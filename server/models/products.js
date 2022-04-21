const { pool } = require("./pool");

function getAllProducts(req, res, next) {
  const queryString = "SELECT * FROM produk"
  pool.query(queryString, (err, data) => {
    if (err) {
      req.err = err
      next()
    }
    req.data = data.rows
    next()
  })
}

module.exports = {getAllProducts}