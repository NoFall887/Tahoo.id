const {
  getRevenue,
  getItemData,
  getDoneOrder,
  addRevenue,
  updateRevenue,
} = require("../models/revenue");

const revenueRoute = require("express").Router();

revenueRoute.get("/admin/done-order/:date", async (req, res) => {
  const { date } = req.params;
  var result = await getDoneOrder(date);
  if (result[0].success === true) {
    result = result.slice(1);

    return res.json({ success: true, data: result });
  }
  return res.json({ success: false });
});

revenueRoute.get("/admin/revenue/:date", async (req, res) => {
  const { date } = req.params;
  var result = await getRevenue(date);

  if (result[0].success === true) {
    result = result.slice(1);

    return res.json({ success: true, data: result });
  }
  return res.json({ success: false });
});

revenueRoute.get("/admin/item-data", async (req, res) => {
  const result = await getItemData();
  if (result[0].success === true) {
    return res.json({
      success: true,
      data: result.slice(1),
    });
  }
  return res.json({ success: false });
});

revenueRoute.post("/admin/revenue", async (req, res) => {
  const result = await addRevenue(req.body.formData);
  if (result.success === true) {
    return res.json({
      success: true,
    });
  }
  return res.json({ success: false });
});

revenueRoute.put("/admin/revenue/", async (req, res) => {
  const { jumlah, id_catatan_pendapatan } = req.body;
  const result = await updateRevenue(jumlah, id_catatan_pendapatan);
  if (result.success === true) {
    return res.json({
      success: true,
    });
  }
  return res.json({ success: false });
});

module.exports = { revenueRoute };
