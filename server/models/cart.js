const { pool } = require("./pool");

async function addCart(userId, productId, jumlah) {
  const queryString = `
select * from add_cart_item($1, $2, $3);`;
  try {
    await pool.query(queryString, [userId, productId, jumlah]);
    return "success";
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getCart(userId) {
  const queryString = `
SELECT id_keranjang, id_produk, nama_produk, jumlah AS jumlah, harga 
FROM produk
JOIN detail_keranjang USING(id_produk)
JOIN keranjang USING(id_keranjang)
WHERE id_profile=$1
`;
  try {
    const result = await (await pool.query(queryString, [userId])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err, "getCart");
    return err;
  }
}

async function checkout(userId) {
  const queryString = `
SELECT * FROM checkout($1)`;
  try {
    const result = await (await pool.query(queryString, [userId])).rows;
    return [{ success: true }, ...result];
  } catch (err) {
    console.log(err, "checkout");
    return err;
  }
}

async function updateCart(jumlah, productId, cartId) {
  const queryString = `
UPDATE detail_keranjang
SET jumlah = $1
WHERE id_produk = $2
AND id_keranjang = $3`;
  try {
    await pool.query(queryString, [jumlah, productId, cartId]);
    return { success: true };
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { addCart, getCart, checkout, updateCart };
