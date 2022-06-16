const {
  addCart,
  getCart,
  checkout,
  updateCart,
  deleteCartItem,
} = require("../models/cart");

const cartRouter = require("express").Router();

cartRouter.post("/add-cart-item", async (req, res) => {
  const result = await addCart(
    req.user.id_profile,
    req.body.productId,
    req.body.jumlah
  );
  if (result === "success") {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

cartRouter.get("/cart", async (req, res) => {
  let result = await getCart(req.user.id_profile);
  if (result[0].success) {
    result = result.slice(1);

    result.map((element) => {
      let total = 0;
      total += element.harga * element.jumlah;
      element.total = total;
      return element;
    });

    return res.json({ success: true, data: result });
  }
  return res.json({ success: false });
});

cartRouter.get("/checkout", async (req, res) => {
  const result = await checkout(req.user.id_profile);
  if (result[0].success) {
    return res.json({ success: true, data: result.slice(1) });
  }
  return res.json({ success: false });
});

cartRouter.post("/update-cart/:id", (req, res) => {
  const { oldData, newData } = req.body;

  newData.forEach(async (val, index) => {
    if (val.deleted) {
      const result = await deleteCartItem(val.id_produk, val.id_keranjang);
      if (!result.success) return res.json({ success: false });
    } else if (val.jumlah !== oldData[index].jumlah) {
      const result = await updateCart(
        val.jumlah,
        val.id_produk,
        val.id_keranjang
      );
      if (!result.success) return res.json({ success: false });
    }
  });
  return res.json({ success: true });
});

module.exports = { cartRouter };
