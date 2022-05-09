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

async function getAdminProducts() {
  const queryString = "SELECT id_produk, nama_produk, foto FROM produk";
  try {
    const res = await pool.query(queryString);
    return [{ success: true }, ...res.rows];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getProduct(id) {
  const queryString = "SELECT * FROM produk WHERE id_produk=$1";
  try {
    const res = await pool.query(queryString, [parseInt(id)]);
    return [{ success: true }, res.rows[0]];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function updateProduct(nama, harga, deskripsi, foto, id) {
  const queryString = `
UPDATE produk
SET nama_produk=$1,
    harga=$2,
    deskripsi=$3,
    foto=$4
WHERE id_produk=$5
RETURNING id_produk;`;
  try {
    const res = await pool.query(queryString, [
      nama,
      harga,
      deskripsi,
      foto,
      parseInt(id),
    ]);
    return [{ success: true }, res.rows[0]];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function addProduct(nama, harga, deskripsi, foto) {
  const queryString = `
INSERT INTO produk(nama_produk, harga, deskripsi, foto)
VALUES ($1, $2, $3, $4)
RETURNING id_produk;`;
  try {
    const res = await pool.query(queryString, [
      nama,
      parseInt(harga),
      deskripsi,
      foto,
    ]);
    return [{ success: true }, res.rows[0]];
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  getAllProducts,
  getAdminProducts,
  getProduct,
  updateProduct,
  addProduct,
};
