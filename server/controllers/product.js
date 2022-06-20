const {
  getAllProducts,
  getAdminProducts,
  getProduct,
  updateProduct,
  addProduct,
} = require("../models/products");
const upload = require("./multer");
const { imgUpload } = require("./profile");

const productRoute = require("express").Router();

productRoute.get("/products", getAllProducts, (req, res) => {
  if (req.err) {
    return res.json(req.err);
  }
  res.json({ success: true, data: req.data });
});

productRoute.get("/products-admin", async (req, res) => {
  const result = await getAdminProducts();

  if (result[0].success) {
    return res.json({ success: true, data: result.slice(1) });
  }
  return res.json({ success: false });
});

productRoute.get("/products-admin/:productId", async (req, res) => {
  const id = req.params.productId;

  const result = await getProduct(id);

  if (result[0].success) {
    return res.json({ success: true, data: result[1] });
  }
  return res.json({ success: false });
});

productRoute.put(
  "/edit-product/:productId",
  upload.any(),
  imgUpload,
  async (req, res) => {
    const id = req.params.productId;
    var { nama, deskripsi, harga } = req.body;
    const imgUrl =
      req.uploadResult?.secure_url == null
        ? req.body.foto
        : req.uploadResult.secure_url;

    const result = await updateProduct(nama, harga, deskripsi, imgUrl, id);
    if (result[0].success) {
      return res.json({ success: true, data: result[1] });
    }
    return res.json({ success: false });
  }
);

productRoute.post("/add-product", upload.any(), imgUpload, async (req, res) => {
  const { nama, deskripsi, harga } = req.body;
  const imgUrl =
    req.uploadResult?.secure_url == null
      ? req.body.foto
      : req.uploadResult.secure_url;
  const result = await addProduct(nama, harga, deskripsi, imgUrl);
  if (result[0].success) {
    return res.json({ success: true, data: result[1] });
  }
  return res.json({ success: false });
});

module.exports = productRoute;
