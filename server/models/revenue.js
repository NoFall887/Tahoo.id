const { pool } = require("./pool");

async function getDoneOrder(date) {
  const queryString = `
SELECT
nama_produk,
TO_CHAR(tanggal_pemesanan, 'dd-mm-yyyy') AS tanggal,
SUM(jumlah)::int AS jumlah,
SUM(detail_pesanan.harga*jumlah)::int AS total
FROM data_pesanan
JOIN data_profile USING(id_profile)
JOIN status_pesanan USING(id_status_pesanan)
JOIN detail_pesanan USING(id_pesanan)
JOIN produk USING(id_produk)
WHERE id_status_pesanan = 1 AND
tanggal_pemesanan = $1
GROUP BY 1, 2`;

  try {
    const result = await (await pool.query(queryString, [date])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return [{ success: false }];
  }
}

async function getRevenue(date) {
  const queryString = `
  SELECT
  id_catatan_pendapatan,
  nama_produk,
  tanggal,
  jumlah,
  catatan_pendapatan.harga,
  (catatan_pendapatan.harga*jumlah)::int AS total
  FROM catatan_pendapatan
  JOIN produk USING(id_produk)
  WHERE tanggal::date = $1`;
  try {
    const result = await (await pool.query(queryString, [date])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err);
    return [{ success: false }];
  }
}

async function getItemData() {
  const queryString = `
SELECT
id_produk,
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

async function addRevenue(datas) {
  let queryString = `
INSERT INTO catatan_pendapatan(jumlah, id_produk, harga, tanggal)
VALUES `;

  // ADD DATA TO INSERT COMMAND
  let pointer = 1;
  let queryDatas = [];
  datas.forEach((data, i) => {
    queryString += `($${pointer}, $${
      pointer + 1
    }, (SELECT harga FROM PRODUK WHERE id_produk = $${pointer + 1}), $${
      pointer + 2
    })`;
    if (i < datas.length - 1) {
      queryString += ",";
    }
    pointer += 3;
    queryDatas.push(data.jumlah, data.produk, new Date());
  });
  console.log(queryString);
  try {
    await pool.query(queryString, queryDatas);
    return { success: true };
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function updateRevenue(jumlah, revenueId) {
  const queryString = `
UPDATE catatan_pendapatan
SET jumlah = $1
WHERE id_catatan_pendapatan=$2`;
  try {
    await pool.query(queryString, [jumlah, revenueId]);
    return { success: true };
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  getDoneOrder,
  getItemData,
  getRevenue,
  addRevenue,
  updateRevenue,
};
