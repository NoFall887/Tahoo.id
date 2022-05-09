const { pool } = require("./pool");

async function addOrder(jumlah, profileId, productId, total) {
  const queryString = `
INSERT INTO data_pesanan(jumlah_pesanan, id_profile, id_status_pesanan, id_produk, total)
VALUES ($1, $2, 2, $3, $4)
`;
  try {
    await pool.query(queryString, [jumlah, profileId, productId, total]);
    return "success";
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getOrder(userId) {
  const queryString = `
SELECT 
id_pesanan, 
jumlah_pesanan, 
tanggal_pemesanan, 
bukti_transaksi, 
nama_produk, 
harga, 
foto, 
status_pesanan,
total
FROM data_pesanan 
JOIN produk USING(id_produk)
JOIN status_pesanan USING(id_status_pesanan)
WHERE id_profile=$1`;

  try {
    const result = await (
      await pool.query(queryString, [parseInt(userId)])
    ).rows;
    result.unshift({ success: true });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function addTransactionProof(orderId, imgUrl) {
  const queryString = `
UPDATE data_pesanan
SET bukti_transaksi=$1
WHERE id_pesanan=$2`;

  try {
    await pool.query(queryString, [imgUrl, parseInt(orderId)]);
    return "success";
  } catch {
    console.log(err);
    return err;
  }
}

async function updateOrder(orderId, jumlah) {
  const queryString = `
UPDATE data_pesanan
SET jumlah_pesanan=$1
WHERE id_pesanan=$2`;
  try {
    await pool.query(queryString, [parseInt(jumlah), parseInt(orderId)]);
    return "success";
  } catch {
    console.log(err);
    return err;
  }
}

async function getAllOrders() {
  const queryString = `
SELECT 
id_pesanan, 
jumlah_pesanan, 
tanggal_pemesanan, 
bukti_transaksi, 
nama_produk, 
total
status_pesanan 
FROM data_pesanan 
JOIN produk USING(id_produk)
JOIN status_pesanan USING(id_status_pesanan)`;
  try {
    const result = await (await pool.query(queryString)).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  addOrder,
  getOrder,
  addTransactionProof,
  updateOrder,
  getAllOrders,
};
