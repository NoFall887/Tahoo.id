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
id_status_pesanan,
id_produk,
bukti_transaksi,
nama_produk,
detail_pesanan.harga,
jumlah,
foto,
TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal
FROM data_pesanan
JOIN status_pesanan USING(id_status_pesanan)
JOIN detail_pesanan USING(id_pesanan)
JOIN produk USING(id_produk)
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

async function updateOrder(jumlah, orderId, productId) {
  console.log(jumlah, orderId, productId);
  const queryString = `
UPDATE detail_pesanan
SET jumlah=$1
WHERE id_pesanan=$2
AND id_produk=$3`;
  try {
    await pool.query(queryString, [
      parseInt(jumlah),
      parseInt(orderId),
      parseInt(productId),
    ]);
    return { success: true };
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getAllOrders() {
  const queryString = `
SELECT 
id_pesanan,
nama,
id_status_pesanan,
TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal,
SUM(detail_pesanan.harga*jumlah)::int AS total
FROM data_pesanan
JOIN data_profile USING(id_profile)
JOIN status_pesanan USING(id_status_pesanan)
JOIN detail_pesanan USING(id_pesanan)
JOIN produk USING(id_produk)
GROUP BY 1, 2, 3, 4
ORDER BY id_pesanan DESC`;
  try {
    const result = await (await pool.query(queryString)).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getOrderDetail(orderId) {
  const queryString = `
SELECT 
id_pesanan,
id_status_pesanan,
nama_produk,
bukti_transaksi,
jumlah,
detail_pesanan.harga,
TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal
FROM data_pesanan
JOIN data_profile USING(id_profile)
JOIN status_pesanan USING(id_status_pesanan)
JOIN detail_pesanan USING(id_pesanan)
JOIN produk USING(id_produk)
WHERE id_pesanan=$1`;
  try {
    const result = await (await pool.query(queryString, [orderId])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function updateOrderStatus(orderId, status) {
  const queryStringCart = `
UPDATE data_pesanan
SET id_status_pesanan = $2
WHERE id_pesanan = $1`;

  try {
    await pool.query(queryStringCart, [orderId, status]);
    return { success: true };
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
  getOrderDetail,
  updateOrderStatus,
};
