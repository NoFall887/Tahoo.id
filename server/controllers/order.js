const {
  addOrder,
  getOrder,
  addTransactionProof,
  updateOrder,
  getAllOrders,
  getOrderDetail,
  updateOrderStatus,
} = require("../models/order");
const upload = require("./multer");
const { imgUpload } = require("./profile");

const orderRoute = require("express").Router();

orderRoute.post("/add-order", async (req, res) => {
  const result = await addOrder(
    req.body.jumlah,
    req.body.userId,
    req.body.productId,
    req.body.jumlah * req.body.harga
  );
  if (result === "success") return res.json({ success: true });
  return res.json({ success: false });
});

orderRoute.get("/get-order/:userId", async (req, res) => {
  var result = await getOrder(req.params.userId);

  if (result[0].success) {
    var temp = result.slice(1);

    result = {};
    temp.forEach((val) => {
      let id = val.id_pesanan;
      result[id] ? result[id].push(val) : (result[id] = [val]);
    });

    temp = { ...result };

    var total = 0;
    result = [];
    for (let key in temp) {
      temp[key].forEach((val) => {
        total += val.harga * val.jumlah;
      });
      result.push([total, ...temp[key]]);
      total = 0;
    }

    result = result.reverse();

    return res.json({ success: true, data: result });
  }
  return res.json({ success: false });
});

orderRoute.post(
  "/bukti-transaksi",
  upload.any(),
  imgUpload,
  async (req, res) => {
    if (req.uploadResult?.secure_url === null)
      return res.json({ success: false });
    const result = await addTransactionProof(
      req.body.orderId,
      req.uploadResult.secure_url
    );

    if (result === "success") return res.json({ success: true });
    res.json({ success: false });
  }
);

// admin routes
orderRoute.get("/admin/get-all-orders", async (req, res) => {
  if (!req.user.is_admin)
    return res.status(401).json({ message: "not an admin" });
  const result = await getAllOrders();
  if (result[0].success === true) {
    return res.json({ success: true, data: result.slice(1) });
  }
  return res.json({ success: false });
});

orderRoute.get("/admin/get-order-detail/:id", async (req, res) => {
  var result = await getOrderDetail(req.params.id);
  if (result[0].success === true) {
    result = result.slice(1);
    var total = 0;

    result.forEach((val) => {
      val.total = val.harga * val.jumlah;
      total += val.harga * val.jumlah;
    });

    return res.json({ success: true, data: [total, ...result] });
  }
  return res.json({ success: false });
});

orderRoute.post("/admin/update-order-status/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  const result = await updateOrderStatus(orderId, status);
  if (result.success === true) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

orderRoute.put("/update-order", async (req, res) => {
  const { data } = req.body;
  for (let item of data) {
    console.log(item);
    const result = await updateOrder(
      item.jumlah,
      item.id_pesanan,
      item.id_produk
    );
    if (!result.success) {
      return res.json({ success: false });
    }
  }
  return res.json({ success: true });
});

module.exports = orderRoute;
