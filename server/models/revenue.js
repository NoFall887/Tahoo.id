const { pool } = require("./pool");

async function getRevenue(date) {
  const queryString = `
SELECT
nama_produk,
TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal,
jumlah,
(detail_pesanan.harga*jumlah)::int AS total
FROM data_pesanan
JOIN data_profile USING(id_profile)
JOIN status_pesanan USING(id_status_pesanan)
JOIN detail_pesanan USING(id_pesanan)
JOIN produk USING(id_produk)
WHERE id_status_pesanan = 1 AND
tanggal_pemesanan = $1
UNION
SELECT
nama_produk,
TO_CHAR(tanggal, 'dd-mm-yyyy') AS tanggal,
jumlah,
(harga*jumlah)::int AS total
FROM catatan_pendapatan
JOIN produk USING(id_produk)
WHERE tanggal = $1`;
  //   const queryString = `
  //   SELECT
  //   nama_produk,
  //   TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal,
  //   SUM(jumlah) AS jumlah,
  //   SUM(detail_pesanan.harga*jumlah)::int AS total
  //   FROM data_pesanan
  //   JOIN data_profile USING(id_profile)
  //   JOIN status_pesanan USING(id_status_pesanan)
  //   JOIN detail_pesanan USING(id_pesanan)
  //   JOIN produk USING(id_produk)
  //   WHERE id_status_pesanan = 1 AND
  //   tanggal_pemesanan = $1
  //   GROUP BY 1,2
  //   UNION
  //   SELECT
  //   nama_produk,
  //   TO_CHAR(tanggal, 'dd-mm-yyyy') AS tanggal,
  //   SUM(jumlah) AS jumlah,
  //   SUM(harga*jumlah)::int AS total
  //   FROM catatan_pendapatan
  //   JOIN produk USING(id_produk)
  //   WHERE tanggal = $1
  //   GROUP BY 1,2
  // `;
  try {
    const result = await (await pool.query(queryString, [date])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getItemData() {
  const queryString = `
SELECT 
nama_produk,
harga 
FROM produk`;
  try {
    const result = await (await pool.query(queryString)).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { getRevenue, getItemData };
